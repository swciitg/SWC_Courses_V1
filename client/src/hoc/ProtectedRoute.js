import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'

 const ProtectedRoute = (props) => {

    const isLoggedIn = useSelector(state =>  state.isAuth)
    const { path,Component,user,isAuth, ...rest } = props

    return (
        <Route
          path={path}
          {...rest}
          render={props => {
            if (isLoggedIn) return <Component {...props} />;
            return <Redirect to={{ pathname: "/admin/welcome" }} />;
          }}
        />
      );
}

export default ProtectedRoute;

