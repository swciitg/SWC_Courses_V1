import React, { useContext, useState } from "react";
import styles from "./AppNavbar.module.css";
import Logo from "../../Logo/Logo";
import OutlookLogin from "./OutlookLogin/OutlookLogin";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserContext } from "../../../contexts/UserContext";
import Dashboard from "./Dashboard/Dashboard";
import CoursesBtn from "./CoursesBtn/CoursesBtn";
import AdminBtn from "./AdminBtn/AdminBtn";
import Sidemenu from "./Sidemenu/Sidemenu";

const AppNavbar = (props) => {
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  return (
    <div className={styles.AppNav}>
      <Logo />
      {user.isAdmin ? <AdminBtn /> : null}
      {isLoggedIn ? <Dashboard courses={props.courses} /> : <OutlookLogin />}
      <CoursesBtn />
      <Sidemenu user={user} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default AppNavbar;
