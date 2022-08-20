import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const PrivateRoute = ({ children }) => {
  const [user] = useCookies(["user"]);
  
  return user.user.admin === true ? children : <Navigate to="/user" />;
};
