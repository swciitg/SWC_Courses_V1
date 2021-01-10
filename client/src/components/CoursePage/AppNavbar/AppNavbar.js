import React, { Component } from "react";
import Logo from "../../Logo/Logo";
import glass from "../../../images/search-glass.png";
import { Navbar, Nav, NavLink, NavItem, Container } from "reactstrap";
import { Link } from "react-router-dom";
import styles from "./AppNavbar.module.css";
import Avatar from "@material-ui/core/Avatar";

class AppNavbar extends Component {
  logoutHandler = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  render() {
    return (
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
              <NavLink className={styles.NavLink} onClick={this.logoutHandler}>
                LOGOUT
              </NavLink>
            </Link>
          </NavItem>
          <NavItem className={styles.NavItem}>
            <Link to="/profile">
              <NavLink className={styles.NavLink}>{this.props.name}</NavLink>
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
    );
  }
}

export default AppNavbar;
