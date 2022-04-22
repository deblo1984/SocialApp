import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Ass!Book</h3>
          <span className="loginDesc">
            Connect with ass friends all around the world
          </span>
        </div>

        <div className="loginRight">
          <div className="loginBox">
            <input type="text" placeholder="username" className="loginInput" />
            <input type="text" placeholder="Email" className="loginInput" />
            <input type="password" placeholder="Email" className="loginInput" />
            <input
              type="password"
              placeholder="Password again"
              className="loginInput"
            />
            <button className="loginButton">Sign up</button>
            <button className="loginRegisterButton">
              log into your account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
