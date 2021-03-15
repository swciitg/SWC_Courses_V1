import React, { useEffect, useState, useContext } from "react";
import DashBoard from "./DashBoard/DashBoard";
import classNames from "classnames";
import styles from "./CourseDetail.module.css";
import { CoursesContext } from "../../contexts/CoursesContext";
import CourseDetailNav from "./CourseDetailNav.js/CourseDetailNav";
import Footer from "../Footer/Footer";
const CourseDetail = (props) => {
  const details = { ...props.location.state };
  const { courses } = useContext(CoursesContext);

  useEffect(() => {
    // console.log("Props from card", details);
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
    <><div className={classNames(styles.MainBody)}>
      <CourseDetailNav courses={courses} />
      <DashBoard details={details} />
    </div>
    <Footer/></>
  );
};

export default CourseDetail;
