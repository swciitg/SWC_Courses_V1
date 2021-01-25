import React, { useContext, useState, useEffect } from "react";
import { CoursesContext } from "../../contexts/CoursesContext";
import { UserContext } from "../../contexts/UserContext";
import AppNavbar from "./AppNavbar/AppNavbar";
import { Container } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./CoursePage.module.css";
import CourseCard from "./CourseCard/CourseCard";
import axios from "axios";

const CoursePage = (props) => {
  const { courses } = useContext(CoursesContext);
  const { user } = useContext(UserContext);
  // const [name, setName] = useState("");
  // const [user, setUser] = useState();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // const [courses, setCourses] = useState([]);

  useEffect(() => {
    // console.log("Courses", courses);
    // console.log("User", user);
    if (user.name !== undefined) {
      const eCourses = courses.filter((course) => {
        return user.enrolled_courses_id.includes(course._id);
      });
      setEnrolledCourses(eCourses);
    }
  }, [courses]);

  return (
    <div className={styles.Body}>
      <AppNavbar name={user.name} />

      <Container className={classNames(styles.Container, "py-5")}>
        <h2
          style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}
        >
          ENROLLED COURSES
        </h2>
        <Container
          className="d-flex"
          style={{ flexWrap: "wrap", justifyContent: "center" }}
        >
          {enrolledCourses.length === 0 ? (
            <h6 style={{ color: "#555" }}>
              EXPLORE COURSES AND START LEARNING
            </h6>
          ) : (
            enrolledCourses.map((course, i) => {
              return (
                <CourseCard
                  key={i}
                  imgScr={course.img}
                  title={course.title}
                  description={course.description}
                  id={course._id}
                  videos={course.videos}
                  user={user}
                />
              );
            })
          )}
        </Container>
      </Container>
    </div>
  );
};

export default CoursePage;

// useEffect(() => {
//   ///////// @start
//   ///////// THIS IS AN API CALL TO THE "/user" ROUTE
//   const apiCall = () => {
//     axios
//       .get("/user")
//       .then((res) => {
//         // console.log(res.data);
//         setUser(res.data);
//         setName(res.data.name);
//       })
//       .catch((err) => console.log(err));
//   };
//   apiCall();
//   ////////// @end
// }, []);

// useEffect(() => {
//   if (name !== "") {
//     ///////// @start
//     ///////// THIS IS AN API CALL TO THE "/api/courses" ROUTE
//     const apiCall = () => {
//       axios
//         .get("/api/courses")
//         .then((res) => {
//           setCourses(res.data.courses);
//           const eCourses = res.data.courses.filter((course) => {
//             return user.enrolled_courses_id.includes(course._id);
//           });
//           setEnrolledCourses(eCourses);
//         })
//         .catch((err) => console.log(err));
//     };
//     apiCall();
//     ////////// @end
//   }
// }, [name]);
