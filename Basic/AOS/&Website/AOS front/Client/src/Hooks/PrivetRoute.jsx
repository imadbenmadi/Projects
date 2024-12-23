import React from "react";

import { Route, Navigate } from "react-router-dom";
// import { useAuth } from '../Context/AuthContext'

const PrivetRoute = (pathname) => {
  const user = false;
  if (user) {
    return <Navigate to="/login" />;
  } else {
    return <Navigate to={pathname} />;
  }
};

export default PrivetRoute;
