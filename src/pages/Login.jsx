import React from "react";
import "../styles/Login.css"; 

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Leo Signal Login</h2>
        <form className="login-form">
          <div>
            <label>Email</label>
            <input type="email" className="login-input" placeholder="Enter your email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" className="login-input" placeholder="Enter your password" />
          </div>
          <br></br>
          <button className="login-button">Login</button>
          <a href="#" className="forgot-password">Forgot Password?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
