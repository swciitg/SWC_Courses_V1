import React, { Component } from "react";
import { Navbar, NavbarToggler } from "reactstrap";
import styles from "./AppNavbar.module.css";
import Logo from "../../Logo/Logo";
import SignedIn from "./SignedIn/SignedIn";
import LoginModal from "./LoginModal/LoginModal";
import SignUpModal from "./SignUpModal/SignUpModal";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div className={styles.AppNav}>
        {/* <Navbar className="navbar navbar-expand-md navbar-light d-flex p-4"> */}
        {/* <NavbarToggler onClick={this.toggle} /> */}
        <Logo className={styles.mobileLogo} />
        {/* <SignedIn /> */}
        <LoginModal />
        <SignUpModal />
        {/* </Navbar> */}
      </div>
    );
  }
}

export default AppNavbar;
