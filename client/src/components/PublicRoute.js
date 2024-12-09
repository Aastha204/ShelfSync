import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (token && userType === "user") {
    // Redirect logged-in users to their user dashboard/profile
    return <Navigate to="/userprofile" />;
  } else if (token && userType === "admin") {
    // Redirect logged-in admins to their admin dashboard
    return <Navigate to="/admin" />;
  }

  // If no token is present, render the requested page
  return children;
};

export default PublicRoute;
