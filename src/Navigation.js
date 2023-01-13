import React from "react";
import { Link } from "react-router-dom";
import AddPost from "./AddPost";

function Navigation() {
  const logout = () => {
    const token = localStorage.getItem("access_token");
    fetch("http://localhost:8080/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res)
      .then((data) => {
        localStorage.removeItem("access_token");
        window.location.href = "/";
      });
  };
  return (
    <div className="navigation-container">
      <div className="logo-container">
        <Link to="/main" className="page-logo">
          Chatter
        </Link>
        <AddPost />
      </div>
      <div className="buttons-container">
        <Link to="/profile" className="profile-button">
          Your Profile
        </Link>
        <button
          className="logout-button"
          onClick={() => {
            logout();
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Navigation;
