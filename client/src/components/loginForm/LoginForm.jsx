import axios from 'axios';
import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthenticationRedux } from '../../Redux/Reducers/authReducer/authReducer';
import { usernameRedux } from '../../Redux/Reducers/usernameReducer/usernameReducer';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [inValidEmailMessage, setInValidEmailMessage] = useState(null);
  const [inValidPasswordMessage, setInValidPasswordMessage] = useState(null);

  const auth = useSelector((state) => {
    return state.authentication.auth;
  });

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await api.post(
      '/auth/login',
      { email: loginEmail, password: loginPassword },
      { withCredentials: true }
    );

    if (res.data.message === 'already logged in' || res.data.message === 'login successfully') {
      dispatch(AuthenticationRedux('true'));
    }
    if (res.data.message === 'Email does not exist') {
      dispatch(AuthenticationRedux('false'));
      setInValidEmailMessage(res.data.message);
    } else {
      setInValidEmailMessage(null);
    }
    if (res.data.message === 'password does not matched') {
      dispatch(AuthenticationRedux('false'));
      setInValidPasswordMessage(res.data.message);
    } else {
      setInValidPasswordMessage(null);
    }
    if (res.data.username) {
      dispatch(usernameRedux(res.data.username));
    }
  }

  function handleEmailChange(e) {
    setLoginEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setLoginPassword(e.target.value);
  }

  useMemo(() => {
    async function loginPageGetRequest() {
      try {
        const res = await api.get('/auth/login', { withCredentials: true });

        if (res.data.message === 'already logged in') {
          dispatch(AuthenticationRedux('true'));
        } else if (res.data.message === 'login first') {
          dispatch(AuthenticationRedux('false'));
        }
        if (res.data.username) {
          dispatch(usernameRedux(res.data.username));
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    loginPageGetRequest();
  }, []);

  return (
    <>
      {auth === 'true' ? (
        <>
          <Navigate to="/Dashboard" />
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className={inValidEmailMessage === null ? '' : 'is-invalid'}
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleEmailChange}
            />
            <div className="invalid-feedback">{inValidEmailMessage}</div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={inValidPasswordMessage === null ? '' : 'is-invalid'}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <div className="invalid-feedback">{inValidPasswordMessage}</div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}

export default LoginForm;
