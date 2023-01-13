import React, { useState } from "react";
import Navigation from "./Navigation";

function ProfilePage() {
  const [newemail, setNewEmail] = useState();


  const changeEmail = () => {
    if (newemail !== undefined) {
      const token = localStorage.getItem("access_token");
      fetch("http://localhost:8080/updateemail", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newemail }),
      })
        .then((res) => {
          return res;
        })
        .then((response) => {
          localStorage.removeItem("access_token");
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

 
  return (
    <>
      <Navigation />
      <div className="profile-container">
        <div className="profile-inputs-container">
          <label className="profile-label">Change Email ↓</label>
          <input
            className="profile-input"
            type="text"
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
          <button
            className="confirm-change-button"
            onClick={() => {
              changeEmail();
            }}
          >
            Confirm Change
          </button>

         
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
