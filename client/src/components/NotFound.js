import React from "react";
import { Link } from "react-router-dom";
// import "../styles/NotFound.css"; // Optional: Add custom styling

function NotFound() {
  return (
    <div className="not-found">
      <img src="./images/404.jpg" alt="" />
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
