import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AuthenticationRedux } from '../../Redux/Reducers/authReducer/authReducer';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

function SignupForm() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [inValidUsernameMessage, setInValidUsernameMessage] = useState(null);
  const [inValidEmailMessage, setInValidEmailMessage] = useState(null);
  const [inValidPasswordMessage, setInValidPasswordMessage] = useState(null);
  const [passwordDosntMatchMessage, setPasswordDosntMatchMessage] = useState(null);

  const auth = useSelector((state) => {
    return state.authentication.auth;
  });

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await api.post(
      '/auth/signup',
      { username, email, password, confirmPassword },
      { withCredentials: true }
    );

    if (res.data.message === 'already logged in') {
      dispatch(AuthenticationRedux('true'));
    } else if (res.data.message === 'user registration successfully') {
      dispatch(AuthenticationRedux('false'));
      setSignupSuccess(true);
    }
    if (res.data.message.username) {
      dispatch(AuthenticationRedux('false'));
      setInValidUsernameMessage(res.data.message.username);
    } else {
      setInValidUsernameMessage(null);
    }
    if (res.data.message.email) {
      dispatch(AuthenticationRedux('false'));
      setInValidEmailMessage(res.data.message.email);
    } else {
      setInValidEmailMessage(null);
    }
    if (res.data.message.password) {
      dispatch(AuthenticationRedux('false'));
      setInValidPasswordMessage(res.data.message.password);
    } else {
      setInValidPasswordMessage(null);
    }
    if (res.data.message.confirmPassword) {
      dispatch(AuthenticationRedux('false'));
      setPasswordDosntMatchMessage(res.data.message.confirmPassword);
    } else {
      setPasswordDosntMatchMessage(null);
    }
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  return (
    <>
      {signupSuccess && <Navigate to="/login" />}
      {auth === 'true' ? (
        <Navigate to="/" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className={inValidUsernameMessage === null ? '' : 'is-invalid'}
              type="text"
              name="username"
              placeholder="Enter username"
              id="validationServer01"
              onChange={handleUsernameChange}
            />
            <div className="invalid-feedback">{inValidUsernameMessage}</div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className={inValidEmailMessage === null ? '' : 'is-invalid'}
              type="email"
              name="email"
              placeholder="Enter email"
              id="validationServer02"
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
              id="validationServer03"
              onChange={handlePasswordChange}
            />
            <div className="invalid-feedback">{inValidPasswordMessage}</div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className={passwordDosntMatchMessage === null ? '' : 'is-invalid'}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              id="validationServer04"
              onChange={handleConfirmPasswordChange}
            />
            <div className="invalid-feedback">{passwordDosntMatchMessage}</div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}

export default SignupForm;
