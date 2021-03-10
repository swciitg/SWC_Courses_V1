import React, { useEffect, useState } from "react";
import styles from "./DashBoard.module.css";
import classNames from "classnames";
import Aux from "../../../hoc/Auxilary";
import Content from "./Content/Content";
import Header from "./Header/Header";
import axios from "axios";

const DashBoard = ({ details }) => {
  const [user, setUser] = useState({});
  const [fname, setFname] = useState("");
  const [enCourseIDs, setEnCourseIDs] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(
    enCourseIDs.includes(details.id)
  );

  useEffect(() => {
    ///////// @start
    ///////// THIS IS AN API CALL TO THE "/user" ROUTE
    const apiCall = () => {
      axios
        .get("/user")
        .then((res) => {
          setUser(res.data);
          let ids = [];
          res.data.enrolled_courses_id.map(({ _id }, i) => {
            ids.push(_id);
          });
          setEnCourseIDs(ids);
          setIsEnrolled(ids.includes(details.id));
          setFname(res.data.name.substring(0, res.data.name.indexOf(" ")));
        })
        .catch((err) => console.log(err));
    };
    apiCall();
    ////////// @end
  }, []);

  const enrolCourse = (e) => {
    axios
      .get(`/api/courses/${details.id}/enrol`)
      .then((res) => {
        console.log(res.data);
        setIsEnrolled(true);
        setEnCourseIDs([...enCourseIDs, details.id]);
        // setOpen(true);
      })
      .catch((e) => console.log("Enrol failed", e));
  };

  return (
    <Aux>
      <div
        className={classNames(
          "container-fluid",
          "p-0",
          "d-flex",
          "flex-column",
          styles.MainBody
        )}
      >
        <Header
          details={details}
          user={user}
          fname={fname}
          enrolCourse={enrolCourse}
          isEnrolled={isEnrolled}
        />
        <Content details={details} />
      </div>
    </Aux>
  );
};

export default DashBoard;
