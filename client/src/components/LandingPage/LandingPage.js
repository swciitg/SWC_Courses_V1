import React, { useState, useEffect } from "react";
import AppNavbar from "./AppNavbar/AppNavbar";
import HomeScreen from "./HomeScreen/HomeScreen";
import styles from "./LandingPage.module.css";
import CardContainer from "./Cards/CardContainer";
import axios from "axios";
import ErrorBoundary from "../../hoc/ErrorBoundary";

const LandingPage = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // AJAX call to /api/courses to retrieve json data on courses
    async function fetchCourses() {
      let response = await axios("api/courses");
      setCourses(response.data.courses);
      // setCourses("No courses found");
    }

    fetchCourses();
  }, []);

  return (
    <div className={styles.App}>
      <AppNavbar />
      <HomeScreen />
      <ErrorBoundary>
        <CardContainer courses={courses} />
      </ErrorBoundary>
    </div>
  );
};

export default LandingPage;
