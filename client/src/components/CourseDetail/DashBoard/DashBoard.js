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
  const [courseIDs, setCourseIDs] = useState([]);

  useEffect(() => {
    ///////// @start
    ///////// THIS IS AN API CALL TO THE "/user" ROUTE
    const apiCall = () => {
      axios
        .get("/user")
        .then((res) => {
          setUser({ ...res.data });
          setCourseIDs(res.data.enrolled_courses_id);
          setFname(res.data.name.substring(0, res.data.name.indexOf(" ")));
        })
        .catch((err) => console.log(err));
    };
    apiCall();
    ////////// @end
  }, []);

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
          courseIDs={courseIDs}
        />
        <Content details={details} />
      </div>
    </Aux>
  );
};

export default DashBoard;
