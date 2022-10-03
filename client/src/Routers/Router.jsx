import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar';
import Dashboard from '../pages/Dashboard/Dashboard';
import Error from '../pages/Error/Error';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Protected from './protected/Protected';

function Router() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogIn() {
    setIsLoggedIn(!isLoggedIn);
  }
  return (
    <>
      <BrowserRouter>
        <NavBar />
        {isLoggedIn ? (
          <button onClick={handleLogIn}>Log Out</button>
        ) : (
          <button onClick={handleLogIn}>Log In</button>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/Dashboard"
            element={
              <Protected isLoggedIn={isLoggedIn}>
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
export default Router;
