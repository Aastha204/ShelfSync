import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token || userType !== 'admin') {
    // Redirect to login if not authenticated or not an admin
    return <Navigate to="/adminlogin" />;
  }

  return children;
};

export default ProtectedRoute;
