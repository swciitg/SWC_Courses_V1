import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    ///////// @start
    ///////// THIS IS AN API CALL TO THE "/user" ROUTE
    const apiCall = () => {
      axios
        .get("/user")
        .then((res) => {
          //   console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    };
    apiCall();
    ////////// @end
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};
