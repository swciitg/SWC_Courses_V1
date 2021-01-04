import React, { useEffect, useState } from "react";
import DashBoard from "./DashBoard/DashBoard";
import classNames from "classnames";
import styles from "./CourseDetail.module.css";
import axios from "axios";

const CourseDetail = (props) => {
  const details = { ...props.location.state };
  // const [videos, setVideos] = useState([]);

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
    <div className={classNames("p-3", "p-sm-4", styles.MainBody)}>
      <DashBoard details={details} />
    </div>
  );
};

export default CourseDetail;
