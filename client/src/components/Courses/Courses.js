import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Courses.module.css";
import glass from "../../images/search-glass.png";
import {
  Navbar,
  Nav,
  NavLink,
  NavItem,
  Collapse,
  NavbarBrand,
  NavbarToggler,
  NavbarText,
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import newlogo from "../../images/newlogo.svg";

const Courses = (props) => {
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [newcourses, setNewcourses] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavBar = () => setIsNavOpen(!isNavOpen);

  const logoutHandler = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const loginHandler = () => {
    window.open("http://localhost:5000/auth/outlook", "_self");
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const GetCourses = () => {
    axios
      .get("/api/courses")
      .then((response) => {
        const data = response.data.courses;
        setCourses(data);
        setNewcourses(data);
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!!");
      });
  };

  useEffect(() => {
    GetCourses();
    window.onscroll = () => {
      if (window.pageYOffset > 50) {
        setIsScrolled(true);
      }
      if (window.pageYOffset < 50) {
        setIsScrolled(false);
      }
    };
    console.log(courses);
  }, [isScrolled, setIsScrolled]);

  const filterchange = (event) => {
    // console.log("hello", event.target.value);
    setInputvalue(event.target.value);
    const newcourses = courses.filter((course) => {
      return course.title.toLowerCase().includes(inputvalue.toLowerCase());
    });
    setNewcourses(newcourses);
  };

  const displaycourselist = (courses) => {
    const newcourses = courses.filter((course) => {
      return course.title.toLowerCase().includes(inputvalue.toLowerCase());
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
            imgScr: course.imgPath,
            title: course.title,
            videos: course.videos,
          },
        }}
        style={{ textDecoration: "none" }}
      >
        <Card className={classNames(styles.CourseCard, "border-light")}>
          <CardImg top width="100%" src={course.imgPath} alt="Card image cap" />
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

  return (
    <div className={styles.App}>
      <Navbar
        // className="navbar navbar-expand-lg navbar-light d-flex justify-content-between pt-2"
        id="navbar"
        className={isScrolled ? styles.scroll : styles.NavBar}
        light
        expand="md"
      >
        <NavbarBrand>
          <Link to="/">
            <img src={newlogo} alt="logo" />
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavBar} />
        <Collapse isOpen={isNavOpen} navbar>
          <Nav className={styles.Nav}>
            <NavItem className={styles.NavItem}>
              <form
                className={styles.SearchForm}
                // action="/courses/search"
                // method="get"
                onSubmit={submitHandler}
              >
                <div className="input-group">
                  <img src={glass} alt="glass" />
                  <input
                    type="text"
                    className="form-control"
                    name="dsearch"
                    value={inputvalue}
                    onChange={filterchange}
                    placeholder="find courses"
                  />
                </div>
              </form>
            </NavItem>
            {isLoggedIn ? (
              <NavItem className={styles.NavItem}>
                <Link to="/logout">
                  <NavLink
                    className={
                      isScrolled ? styles.NavLinkScroll : styles.NavLink
                    }
                    onClick={logoutHandler}
                  >
                    LOGOUT
                  </NavLink>
                </Link>
              </NavItem>
            ) : (
              <NavItem className={styles.NavItem}>
                <Link to="/login">
                  <NavLink
                    className={
                      isScrolled ? styles.NavLinkScroll : styles.NavLink
                    }
                    onClick={loginHandler}
                  >
                    LOGIN
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {isLoggedIn ? (
              <>
                <NavItem className={styles.NavItem}>
                  <Link to="/profile">
                    <NavLink
                      className={
                        isScrolled ? styles.NavLinkScroll : styles.NavLink
                      }
                    >
                      MY COURSES
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem
                  className={classNames("d-none", "d-sm-block", styles.NavItem)}
                >
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <NavLink>
                      {/* <img src={avatar} alt="avatar" /> */}
                      <Avatar alt={props.name} src="#" />
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            ) : (
              <NavbarText
                className={styles.NavItem}
                style={{ color: isScrolled ? "#fff" : "#999" }}
              >
                Welcome Visitor !!
              </NavbarText>
            )}
          </Nav>
        </Collapse>
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
          {displaycourselist(courses)}
        </Container>
      </Container>
    </div>
  );
};

export default Courses;

{
  /* <NavItem className={styles.NavItem}>
              <Link to="/courses">
                <NavLink
                  className={
                    this.state.isScrolled
                      ? styles.NavLinkScroll
                      : styles.NavLink
                  }
                >
                  <div className={styles.dropdown}>
                    <button className={styles.dropbtn}>CATEGORIES ▼</button>
                    <div className={styles.dropdowncontent}>
                      <a onClick={this.GetCourses}>ALL COURSES</a>
                      <a>Link 2</a>
                      <a>Link 3</a>
                    </div>
                  </div>
                </NavLink>
              </Link>
            </NavItem> */
}
