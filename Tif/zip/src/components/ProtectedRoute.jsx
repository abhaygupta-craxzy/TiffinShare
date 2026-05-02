import React from "react";
import { Navigate } from "react-router-dom";
import { checkSession } from "../utils/checkSession";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || !checkSession()) {
    return <Navigate to="/login" />;
  }

  return children;
}