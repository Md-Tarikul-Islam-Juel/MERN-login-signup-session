import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { AuthenticationRedux } from '../../Redux/Reducers/authReducer/authReducer';
import './NavBar.css';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

function NavBar() {
  const auth = useSelector((state) => {
    return state.authentication.auth;
  });

  const username = useSelector((state) => {
    return state.username.username;
  });

  const dispatch = useDispatch();

  async function logoutHandle() {
    const res = await api.get('/auth/logout', { withCredentials: true });

    if (res.data.message === 'successfully logout') {
      dispatch(AuthenticationRedux('false'));
    }
  }

  return (
    <Navbar className="NavBar" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-icon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav nav-parent">
          <Nav className="me-auto nav-child-1">
            <NavLink to="/" className="NavLink">
              Home
            </NavLink>
            {auth === 'true' ? (
              <NavLink to="/Dashboard" className="NavLink">
                Dashboard
              </NavLink>
            ) : (
              ''
            )}
          </Nav>
          {console.log(auth)}
          {auth === 'false' || auth === false ? (
            <Nav className="me-auto nav-child-2">
              <NavLink to="/Login" className="NavLink">
                Login
              </NavLink>
              <NavLink to="/Signup" className="NavLink">
                Signup
              </NavLink>
            </Nav>
          ) : (
            <Nav className="me-auto nav-child-2">
              <Button variant="primary" onClick={logoutHandle}>
                Logout
              </Button>
              <p className="navUser">{username}</p>
              {auth === 'false' ? <Navigate to="/Login " /> : ''}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
