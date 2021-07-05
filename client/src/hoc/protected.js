import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const ProtectedRoute = (props) => {

    const authState = useSelector(state =>  state.isAuth)
    const { redirectPath,Component,user,isAuth, ...routeprops } = props

    return (
        <Route
          {...routeProps}
          render={props => {
            if (isAuth) return <Component {...props} />;
            return <Redirect to={{ pathname: redirectPath || "/Login" }} />;
          }}
        />
      );


}

export const ProtectedRoute;