import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const login = () => {
    if (email !== undefined && password !== undefined) {
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          localStorage.setItem("access_token", data.access_token);
          window.location.href = "/main";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="container">
      <div className="header-container">
        <h1 className="main-title">Hello!</h1>
        <p className="second-title">Login to Continue!</p>
      </div>
      <div className="login-container">
        <label className="main-label">Enter your email ↓</label>
        <input
          className="main-input"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label className="main-label">Enter your password ↓</label>
        <input
          className="main-input"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="register-title">
          Don't have an account?
          <Link to="/register">Sign Up!</Link>
        </p>
        <button
          className="confirm-button"
          onClick={() => {
            login();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Login;
