import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsAuthenticated(loginStatus === "true");
    setIsLoading(false);
  }, []);

  if (isLoading) return null; // Or show a loader
  return isAuthenticated ? children : <Navigate to="/admin_panel/login" />;
};

export default ProtectedRoute;
