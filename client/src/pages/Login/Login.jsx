import React from 'react';
import LoginForm from '../../components/loginForm/LoginForm';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-3">
            <div className="loginForm-div">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
