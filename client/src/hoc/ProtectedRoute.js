import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = (props) => {
  const isLoggedIn = useContext(AuthContext);

  const Component = props.component;

  return isLoggedIn ? <Component /> : <Redirect to={{ pathname: "/" }} />;
};

export default ProtectedRoute;
