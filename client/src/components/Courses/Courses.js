import React, { Component } from "react";
import { Container } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CourseDetail from "../CourseDetail/CourseDetail";
import styles from "./Courses.module.css";
import Button from "@material-ui/core/Button";
import CardContainer from "../LandingPage/Cards/CardContainer";
import ErrorBoundary from "../../hoc/ErrorBoundary";
import Logo from "../Logo/Logo";
import glass from "../../images/search-glass.png";
import { Navbar, Nav, NavLink, NavItem } from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class Courses extends Component {
  state = {
    courses: [],
    inputvalue: "",
    newcourses: [],
  };

  logoutHandler = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  GetCourses = () => {
    axios
      .get("/api/courses")
      .then((response) => {
        const data = response.data.courses;
        this.setState({ courses: data, newcourses: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!!");
      });
  };

  componentDidMount = () => {
    this.GetCourses();
    console.log(this.state.courses);
  };

  filterchange = (event) => {
    // console.log("hello", event.target.value);
    this.setState({
      inputvalue: event.target.value,
    });
    const newcourses = this.state.courses.filter((course) => {
      return course.title
        .toLowerCase()
        .includes(this.state.inputvalue.toLowerCase());
    });
    this.setState({ newcourses: newcourses });
  };

  displaycourselist = (courses) => {
    const newcourses = this.state.courses.filter((course) => {
      return course.title
        .toLowerCase()
        .includes(this.state.inputvalue.toLowerCase());
    });
    if (!newcourses.length)
      return <div className={styles.nocourse}>No Courses Found</div>;

    return newcourses.map((course) => (
      <Link
        to={{
          pathname: `/courses/${course._id}`,
          state: {
            description: course.description,
            id: course._id,
            imgScr: course.img,
            title: course.title,
            videos: course.videos,
          },
        }}
        style={{ textDecoration: "none" }}
      >
        <Card className={classNames(styles.CourseCard, "border-light")}>
          <CardImg top width="100%" src={course.img} alt="Card image cap" />
          <CardBody>
            <CardTitle>
              <h5>{course.title}</h5>
            </CardTitle>
            <CardText>
              <p>{course.description}</p>
            </CardText>
          </CardBody>
        </Card>
      </Link>
    ));
  };

  render() {
    return (
      <div className={styles.App}>
        <Navbar
          className="navbar navbar-expand-lg navbar-light d-flex pt-2 px-4"
          style={{ backgroundColor: "rgb(255, 224, 49)" }}
        >
          <Logo />

          <form
            className={styles.SearchForm}
            // action="/courses/search"
            // method="get"
            onSubmit={this.submitHandler}
          >
            <div className="input-group">
              <img src={glass} alt="glass" />
              <input
                type="text"
                className="form-control"
                name="dsearch"
                value={this.state.inputvalue}
                onChange={this.filterchange}
                placeholder="find courses"
              />
            </div>
          </form>

          <Nav className={styles.Nav}>
            <NavItem className={styles.NavItem}>
              <Link to="/courses">
                <NavLink className={styles.NavLink}>COURSES</NavLink>
              </Link>
            </NavItem>
            <NavItem className={styles.NavItem}>
              <Link to="/logout">
                <NavLink
                  className={styles.NavLink}
                  onClick={this.logoutHandler}
                >
                  LOGOUT
                </NavLink>
              </Link>
            </NavItem>
            <NavItem className={styles.NavItem}>
              <Link to="/profile">
                <NavLink className={styles.NavLink}>MY COURSES</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <NavLink>
                  {/* <img src={avatar} alt="avatar" /> */}
                  <Avatar alt={this.props.name} src="#" />
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
        <Container className={classNames(styles.Container, "py-5")}>
          <h2
            style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}
          >
            ALL COURSES
          </h2>
          <Container
            className="d-flex"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            {this.displaycourselist(this.state.courses)}
          </Container>
        </Container>
      </div>
    );
  }
}

export default Courses;
