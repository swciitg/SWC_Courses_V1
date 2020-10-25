import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  let loginBool = document.cookie.includes("swc-courses-session");
  const [isLoggedIn, setisLoggedIn] = useState(loginBool);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setisLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};
