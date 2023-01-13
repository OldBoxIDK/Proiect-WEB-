import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";

function MainPage() {
  const [posts, setPosts] = useState();
  const change = true;
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch("http://localhost:8080/posts_get", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setPosts(response);
      });
  }, [change]);

  return (
    <div className="mainpage">
      <Navigation />
      {posts !== undefined ?  posts.map((element) => {
        return (
          <div className="post-container">
            <div className="post-text-container">
              <p className="post-title">{element.title}</p>
              <p className="post-description">{element.content}</p>
            
            </div>
          </div>
        ) 

      }
      ): ""}
    </div>
  );
}

export default MainPage;
