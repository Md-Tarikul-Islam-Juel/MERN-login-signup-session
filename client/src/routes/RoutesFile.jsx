import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';

import ModalMessage from '../components/ModalMessage/ModalMessage';
import Dashboard from '../pages/Dashboard/Dashboard';
import Error from '../pages/Error/Error';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import { AuthenticationRedux } from '../Redux/Reducers/authReducer/authReducer';
import { usernameRedux } from '../Redux/Reducers/usernameReducer/usernameReducer';
import Protected from './protected/Protected';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

function RoutesFile() {
  const [networkError, setNetworkError] = useState('');
  const auth = useSelector((state) => {
    return state.authentication.auth;
  });

  const dispatch = useDispatch();

  useMemo(() => {
    async function isAuthinticatedRequest() {
      try {
        const res = await api.get('/auth/isAuthinticated', { withCredentials: true });

        if (res.data.message === 'already logged in') {
          dispatch(AuthenticationRedux('true'));
        } else if (res.data.message === 'login first') {
          dispatch(AuthenticationRedux('false'));
        }
        if (res.data.username) {
          dispatch(usernameRedux(res.data.username));
        }
      } catch (error) {
        setNetworkError(error.message);
      }
    }

    isAuthinticatedRequest();
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        {networkError !== '' ? <ModalMessage message={networkError} /> : ''}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/Dashboard"
            element={
              <Protected isLoggedIn={auth === 'true'}>
                <Dashboard />
              </Protected>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default RoutesFile;
