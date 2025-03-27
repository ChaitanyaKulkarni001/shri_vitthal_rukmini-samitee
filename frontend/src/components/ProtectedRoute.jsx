import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../utils/auth";// Adjust the path as needed

const ProtectedRoute = () => {
  const token = getAuthToken();
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
