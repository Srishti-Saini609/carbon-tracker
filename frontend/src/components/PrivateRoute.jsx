// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // get JWT token

  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login if no token
  }

  return children; // allow access if token exists
};

export default PrivateRoute;
