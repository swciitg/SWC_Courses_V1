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

const AppNavbar = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Navbar
      // className="navbar navbar-expand-lg navbar-light d-flex justify-content-between pt-2"
      id="navbar"
      className={isScrolled ? styles.scroll : styles.NavBar}
      light
      expand="md"
    >
      <NavbarBrand>
        {/* <Logo /> */}
        <Link to="/">
          <img src={newlogo} alt="logo" />
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavBar} />
      <Collapse isOpen={isNavOpen} navbar>
        <Nav className={classNames(styles.Nav)}>
          <NavItem className={styles.NavItem}>
            <form className={styles.SearchForm} onSubmit={submitHandler}>
              <div className="input-group">
                <img src={glass} alt="glass" />
                <input
                  type="text"
                  className="form-control"
                  name="dsearch"
                  // value={state.inputvalue}
                  // onChange={filterchange}
                  placeholder="find courses"
                />
              </div>
            </form>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <Link to="/courses">
              <NavLink
                className={isScrolled ? styles.NavLinkScroll : styles.NavLink}
              >
                COURSES
              </NavLink>
            </Link>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <Link to="/logout">
              <NavLink
                className={isScrolled ? styles.NavLinkScroll : styles.NavLink}
                onClick={logoutHandler}
              >
                LOGOUT
              </NavLink>
            </Link>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <Link to="/profile">
              <NavLink
                className={isScrolled ? styles.NavLinkScroll : styles.NavLink}
              >
                Hi {props.name !== undefined ? props.name.split(" ")[0] : ""}!
              </NavLink>
            </Link>
          </NavItem>
          <NavItem
            className={classNames("d-none", "d-sm-block", styles.NavItem)}
          >
            <Link to="/profile" style={{ textDecoration: "none" }}>
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
