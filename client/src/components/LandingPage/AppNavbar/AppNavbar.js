import React, { Component, useContext } from "react";
import { Navbar, NavbarToggler } from "reactstrap";
import styles from "./AppNavbar.module.css";
import Logo from "../../Logo/Logo";
import SignedIn from "./SignedIn/SignedIn";
import LoginModal from "./LoginModal/LoginModal";
import SignUpModal from "./SignUpModal/SignUpModal";
import OutlookLogin from "./OutlookLogin/OutlookLogin";
import { AuthContext } from "../../../contexts/AuthContext";
import ProfileButton from "./ProfileButton/ProfileButton";

const AppNavbar = (props) => {
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.AppNav}>
      <Logo className={styles.mobileLogo} />
      {isLoggedIn ? <ProfileButton /> : <OutlookLogin />}
      {/* <LoginModal /> */}
    </div>
  );
};

export default AppNavbar;

// const [isOpen, setisOpen] = useState(false);

// const toggle = () => {
//   setisOpen({
//     isOpen: !isOpen,
//   });
// };

/* <Navbar className="navbar navbar-expand-md navbar-light d-flex p-4"> */

/* <NavbarToggler onClick={this.toggle} /> */

/* <SignedIn /> */

/* <SignUpModal /> */

/* </Navbar> */
