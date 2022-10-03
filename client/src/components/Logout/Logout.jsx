import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AuthenticationRedux } from '../../Redux/Reducers/authReducer/authReducer';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

function Logout() {
  const auth = useSelector((state) => {
    return state.authentication.auth;
  });

  const dispatch = useDispatch();

  async function logoutHandle() {
    const res = await api.post('/auth/logout', { withCredentials: true });

    if (res.data.message === 'successfully logout') {
      dispatch(AuthenticationRedux('false'));
    }
  }

  return (
    <>
      {auth === 'false' ? <Navigate to="/" /> : <Navigate to="/" />}
      <Button variant="primary" onClick={logoutHandle}>
        Logout
      </Button>
    </>
  );
}

export default Logout;
