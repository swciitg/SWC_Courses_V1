import React, { useState, useEffect, useContext } from "react";
import styles from "./Courses.module.css";
import newlogo from "../../images/newlogo.svg";
import { AuthContext } from "../../contexts/AuthContext";
import classNames from "classnames";
import { Link } from "react-router-dom";
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

const CoursesNav = (props) => {
  const { inputvalue, filterchange } = props;
  const { isLoggedIn } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 50) {
        setIsScrolled(true);
      }
      if (window.pageYOffset < 50) {
        setIsScrolled(false);
      }
    };
  }, [isScrolled, setIsScrolled]);

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

  return (
    <Navbar
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
            <form className={styles.SearchForm} onSubmit={submitHandler}>
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
              {/* <Link to="/logout"> */}
              <NavLink
                className={isScrolled ? styles.NavLinkScroll : styles.NavLink}
                onClick={logoutHandler}
              >
                LOGOUT
              </NavLink>
              {/* </Link> */}
            </NavItem>
          ) : (
            <NavItem className={styles.NavItem}>
              {/* <Link to="/login"> */}
              <NavLink
                className={isScrolled ? styles.NavLinkScroll : styles.NavLink}
                onClick={loginHandler}
              >
                LOGIN
              </NavLink>
              {/* </Link> */}
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
  );
};

export default CoursesNav;
