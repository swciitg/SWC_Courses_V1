import React, { Component } from "react";
import AppNavbar from "./AppNavbar/AppNavbar";
import { Container } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./CoursePage.module.css";
import CourseCard from "./CourseCard/CourseCard";

class CoursePage extends Component {
  state = {
    showEnrolledCourses: null,
    showAllCourses: null,
    sarchResult: null,
    courseList: [],
  };

  componentDidMount() {
    if (this.props.profile) {
      console.log("Profile");
    }
    if (this.props.courses) {
      console.log("Courses");
    }
  }

  render() {
    return (
      <div className={styles.Body}>
        <AppNavbar />
        <Container>
          <form
            className={styles.SearchForm}
            action="/courses/search"
            method="get"
          >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                name="dsearch"
                placeholder="find courses"
              />
            </div>
          </form>
        </Container>

        <Container className={classNames(styles.Container, "py-5")}>
          <Container class="d-flex" style={{ textAlign: "center" }}>
            <h2 className={styles.Heading}>Enrolled Courses</h2>
            <br />
          </Container>
          <Container
            className="d-flex"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <CourseCard />
          </Container>
        </Container>
      </div>
    );
  }
}

export default CoursePage;
