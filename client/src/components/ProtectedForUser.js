import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedForUser = ({ children }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token || userType !== 'user') {
    // Redirect to login if not authenticated or not an admin
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedForUser;
