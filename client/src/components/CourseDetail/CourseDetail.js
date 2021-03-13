import React, { useEffect, useState, useContext } from "react";
import DashBoard from "./DashBoard/DashBoard";
import classNames from "classnames";
import styles from "./CourseDetail.module.css";
import axios from "axios";
import AppNavbar from "../ProfilePage/AppNavbar/AppNavbar";
import { CoursesContext } from "../../contexts/CoursesContext";
import { UserContext } from "../../contexts/UserContext";
import CourseDetailNav from "./CourseDetailNav.js/CourseDetailNav";

const CourseDetail = (props) => {
  const details = { ...props.location.state };
  const { courses } = useContext(CoursesContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("Props from card", details);
    // ///////// @start
    // ///////// THIS IS AN API CALL TO THE "/api/courses/:id" ROUTE
    // const apiCall = () => {
    //   axios
    //     .get(`/api/courses/${details.id}`)
    //     .then((res) => {
    //       console.log(res.data.media);
    //       setVideos(res.data.media);
    //     })
    //     .catch((err) => console.log(err));
    // };
    // apiCall();
    // ////////// @end
  }, []);

  return (
    <div className={classNames(styles.MainBody)}>
      {/* <AppNavbar name={user.name} courses={courses} /> */}
      <CourseDetailNav courses={courses} />
      <DashBoard details={details} />
    </div>
  );
};

export default CourseDetail;
