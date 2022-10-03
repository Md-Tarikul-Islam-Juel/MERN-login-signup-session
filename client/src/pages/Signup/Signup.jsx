import React from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import './Signup.css';

function Signup() {
  return (
    <>
      <div className="signup-page">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-3">
              <div className="signupForm-div">
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
