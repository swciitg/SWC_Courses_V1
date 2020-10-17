import React, { useState, useEffect } from "react";
import AppNavbar from "./AppNavbar/AppNavbar";
import HomeScreen from "./HomeScreen/HomeScreen";
import styles from "./LandingPage.module.css";
import CardContainer from "./Cards/CardContainer";

const LandingPage = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // AJAX call to /api/courses to retrieve json data on courses
    async function fetchCourses() {
      let response = await fetch("api/courses");
      let data = await response.json();
      setCourses(data.courses);
    }

    fetchCourses();
  }, []);

  return (
    <div className={styles.App}>
      <AppNavbar />
      <HomeScreen />
      <CardContainer courses={courses} />
    </div>
  );
};

export default LandingPage;
