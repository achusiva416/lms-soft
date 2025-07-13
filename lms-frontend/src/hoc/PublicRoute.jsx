import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const redirecturl = user?.role === 'admin' ? '/admin/dashboard' : '/courses';
 
  if (user) {
    return <Navigate to={redirecturl} replace />;
  }

  return children;
};

export default PublicRoute;
