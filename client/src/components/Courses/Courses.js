import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Courses.module.css";
import CoursesNav from "./CoursesNav";
import CardsContainer from "./CardsContainer";

const Courses = (props) => {
  const [courses, setCourses] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [newcourses, setNewcourses] = useState([]);

  useEffect(() => {
    axios
      .get("/api/courses")
      .then((response) => {
        const data = response.data.courses;
        setCourses(data);
        setNewcourses(data);
        console.log("Courses has been received!!");
      })
      .catch(() => {
        alert("Error retrieving courses!!");
      });
  }, []);

  const filterchange = (event) => {
    setInputvalue(event.target.value);
    const newcourses = courses.filter((course) => {
      return course.title.toLowerCase().includes(inputvalue.toLowerCase());
    });
    setNewcourses(newcourses);
  };

  return (
    <div className={styles.App}>
      <CoursesNav inputvalue={inputvalue} filterchange={filterchange} />
      <CardsContainer
        courses={courses}
        newcourses={newcourses}
        inputvalue={inputvalue}
      />
    </div>
  );
};

export default Courses;
