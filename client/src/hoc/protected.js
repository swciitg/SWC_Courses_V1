import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

 const ProtectedRoute = (props) => {

    const authState = useSelector(state =>  state.isAuth)
    const { path,Component,user,isAuth, ...rest } = props

    return (
        <Route
          path={path}
          {...rest}
          render={props => {
            if (isAuth) return <Component {...props} />;
            return <Redirect to={{ pathname: "/Login" }} />;
          }}
        />
      );


}

export default ProtectedRoute;

