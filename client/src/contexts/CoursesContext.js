import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const CoursesContext = createContext();

export const CoursesProvider = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    ///////// @start
    ///////// THIS IS AN API CALL TO THE "/api/courses" ROUTE
    const apiCall = () => {
      axios
        .get("/api/courses")
        .then((res) => {
          setCourses(res.data.courses);
        })
        .catch((err) => console.log(err));
    };
    apiCall();
    ////////// @end
  }, []);

  return (
    <CoursesContext.Provider value={{ courses }}>
      {props.children}
    </CoursesContext.Provider>
  );
};
