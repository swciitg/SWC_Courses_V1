import React, { useState, useEffect } from "react";
import newlogo from "../../../images/newlogo.svg";
import classNames from "classnames";
import glass from "../../../images/search-glass.png";
import {
  Navbar,
  Nav,
  NavLink,
  NavItem,
  Collapse,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { Link } from "react-router-dom";
import styles from "./AppNavbar.module.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Card from "../../LandingPage/Cards/Card";
import urls from "../../../constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    height: "90%",
    border: "#edf8ff 7px solid",
    borderRadius: 30,
    backgroundColor: "#ffffff",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/checkered-light-emboss.png')",
    // backdropFilter: "grayscale(0.5) opacity(1)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "5%",
    left: "10%",
    overflowY: "auto",
    ["@media (max-width: 550px)"]: {
      width: "90%",
      left: "5%",
    },
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#96c6e5",
      borderRadius: 30,
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const AppNavbar = (props) => {
  const { courses } = props;
  const classes = useStyles();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const searchList = courses.filter((course) => {
    return course.title.toLowerCase().includes(search.toLowerCase());
  });

  // BODY FOR SEARCH MODAL
  const body = (
    <div className={classNames(classes.paper)}>
      <h2
        id="simple-modal-title"
        style={{
          textAlign: "center",
          margin: "10px 0 15px",
          color: "#1B3D2F",
          fontFamily: "Poppins",
          fontSize: "3rem",
        }}
      >
        Search Results
      </h2>
      {searchList.length ? (
        <div className={styles.cardContainer}>
          {searchList.map((course, i) => {
            return (
              <Card
                key={i}
                name={`simple-controlled-${i}`}
                imgScr={course.imgPath}
                title={course.title}
                description={course.description}
                id={course._id}
                videos={course.videos}
                author={course.author}
              />
            );
          })}
        </div>
      ) : (
        <h6
          style={{
            textAlign: "center",
            fontFamily: "Poppins",
            fontSize: "1.3rem",
          }}
        >
          No courses found !!
        </h6>
      )}
    </div>
  );

  useEffect(() => {
    const onScroll = () => {
      const scrollCheck = window.scrollY > 10;
      if (scrollCheck !== isScrolled) {
        setIsScrolled(scrollCheck);
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isScrolled, setIsScrolled]);

  const toggleNavBar = () => setIsNavOpen(!isNavOpen);

  const logoutHandler = () => {
    window.open(urls.LOGOUT, "_self");
  };

  return (
    <Navbar
      id="navbar"
      className={isScrolled ? styles.scroll : styles.NavBar}
      light
      expand="md"
    >
      <NavbarBrand>
        <Link to="/courses">
          <img src={newlogo} alt="logo" className={styles.logoImg} />
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavBar} />
      <Collapse isOpen={isNavOpen} navbar>
        <Nav className={classNames(styles.Nav)}>
          <NavItem className={styles.NavItem}>
            <form className={styles.SearchForm} onSubmit={handleOpen}>
              <div className="input-group">
                <img src={glass} alt="glass" />
                <input
                  type="text"
                  className="form-control"
                  name="dsearch"
                  placeholder="find courses"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </form>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <Link to="/courses/courses">
              <NavLink
                className={isScrolled ? styles.NavLinkScroll : styles.NavLink}
              >
                COURSES
              </NavLink>
            </Link>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <NavLink
              className={isScrolled ? styles.NavLinkScroll : styles.NavLink}
              onClick={logoutHandler}
            >
              LOGOUT
            </NavLink>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <Link to="/courses/profile">
              <NavLink
                className={isScrolled ? styles.NavLinkScroll : styles.NavLink}
              >
                Hi {props.name !== undefined ? props.name.split(" ")[0] : ""}!
              </NavLink>
            </Link>
          </NavItem>
          <NavItem
            className={classNames("d-none", "d-lg-block", styles.NavItem)}
          >
            <Link to="/courses/profile" style={{ textDecoration: "none" }}>
              <NavLink
                className={isScrolled ? styles.NavLinkScroll : styles.NavLink}
              >
                <Avatar alt={props.name} src="#" />
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;
