import React, { Component } from "react";
import Logo from "../../Logo/Logo";
import { Navbar, Nav, NavLink, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import styles from "./AppNavbar.module.css";
import Avatar from "@material-ui/core/Avatar";

class AppNavbar extends Component {
  logoutHandler = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  render() {
    return (
      <Navbar className="navbar navbar-expand-lg navbar-light bg-transparent d-flex pt-4 px-4">
        <Logo />
        <Nav className={styles.Nav}>
          <NavItem>
            <Link to="/courses">
              <NavLink className={styles.NavLink}>Courses</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/logout">
              <NavLink className={styles.NavLink} onClick={this.logoutHandler}>
                Logout
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">
              <NavLink className={styles.NavLink}>{this.props.name}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">
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
