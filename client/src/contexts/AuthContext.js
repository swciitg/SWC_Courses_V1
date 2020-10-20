import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={isLoggedIn}>
      {props.children}
    </AuthContext.Provider>
  );
};
