import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <img src="./images/404.jpg" alt="404 Not Found" />
      <Link to="/" className="notfound-home-link">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
