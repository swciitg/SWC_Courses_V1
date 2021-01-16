import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Route, Redirect } from "react-router-dom";
import { useEffect } from "react";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return user.isAdmin ? <Component {...props} /> : <Redirect to="/" />;
        }}
      />
    </div>
  );
};

export default AdminRoute;
