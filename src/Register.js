import React from "react";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);

  const register = () => {
    if (
      password === confirmPassword &&
      username !== undefined &&
      confirmPassword !== undefined
    ) {
      fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      })
        .then(() => window.location.href = "/")
       
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="register-container">
      <div className="register-header-container">
        <p className="main-register">Register to start chatting!</p>
        <p className="second-register">
          & looking for people with the same interests.
        </p>
        <p className="third-register">& feel free to find your style.</p>
      </div>
      <div className="register-inputs-container">
        <label className="register-label">Enter Email ↓</label>
        <input
          className="register-input"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label className="register-label">Enter Password ↓</label>
        <input
          className="register-input"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <label className="register-label">Confirm Password ↓</label>
        <input
          className="register-input"
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button
          className="register-button"
          onClick={() => {
            register();
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
