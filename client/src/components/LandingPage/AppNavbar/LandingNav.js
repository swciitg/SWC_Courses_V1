import React, { useState, useEffect, useContext } from "react";
import styles from "./LandingNav.module.css";
import newlogo from "../../../images/newlogo.svg";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserContext } from "../../../contexts/UserContext";
import classNames from "classnames";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavLink,
  NavItem,
  Collapse,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import urls from "../../../constants";

const LandingNav = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    document.title = "SWC Courses";
  }, []);

  const toggleNavBar = () => setIsNavOpen(!isNavOpen);

  const logoutHandler = () => {
    window.open(urls.LOGOUT, "_self");
  };

  const loginHandler = () => {
    window.open(urls.LOGIN, "_self");
  };

  return (
    <Navbar id="navbar" className={styles.NavBar} light expand="md">
      <NavbarBrand>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={newlogo} alt="logo" />
          {/* <span className="pl-3" style={{ color: "#000" }}>
            SWC COURSES
          </span> */}
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavBar} />
      <Collapse isOpen={isNavOpen} navbar>
        <Nav className={styles.Nav}>
          {user.isAdmin ? (
            <NavItem className={styles.NavItem}>
              <Link to="/admin/courses">
                <NavLink className={styles.NavLink}>Admin</NavLink>
              </Link>
            </NavItem>
          ) : null}
          <NavItem className={styles.NavItem}>
            <Link to="/courses">
              <NavLink className={styles.NavLink}>Explore</NavLink>
            </Link>
          </NavItem>
          {isLoggedIn ? (
            <NavItem className={styles.NavItem}>
              <Link to="/profile">
                <NavLink
                  className={classNames(styles.NavLink, styles.YellowLink)}
                >
                  Dashboard
                </NavLink>
              </Link>
            </NavItem>
          ) : (
            <NavItem className={styles.NavItem}>
              <NavLink
                className={classNames(styles.NavLink, styles.YellowLink)}
                onClick={loginHandler}
              >
                Login
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default LandingNav;
