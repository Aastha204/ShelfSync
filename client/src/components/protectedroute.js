import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, isAuthenticated, userRole }) => {
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    // Simulate preloader hiding after a delay
    const timer = setTimeout(() => {
      setIsPreloading(false); // Hide preloader after 2 seconds
    }, 2000); // Adjust the delay based on your preloader duration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || userRole !== "admin") {
      // Show the toast only when preloader is hidden
      if (!isPreloading) {
        toast.error("Access Denied: You are not authorized to view this page.");
      }
    }
  }, [isAuthenticated, userRole, isPreloading]);

  // If preloading, show preloader, else show children or redirect
 

  if (!isAuthenticated || userRole !== "admin") {
    return <Navigate to="/adminlogin" replace />; // Redirect to home page
  }

  return children; // Render children if authenticated and authorized
};

export default ProtectedRoute;
