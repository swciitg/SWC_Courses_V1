import React, { useContext } from "react";
import styles from "./AppNavbar.module.css";
import Logo from "../../Logo/Logo";
import OutlookLogin from "./OutlookLogin/OutlookLogin";
import { AuthContext } from "../../../contexts/AuthContext";
import Dashboard from "./Dashboard/Dashboard";

const AppNavbar = (props) => {
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.AppNav}>
      <Logo className={styles.mobileLogo} />
      {isLoggedIn ? <Dashboard /> : <OutlookLogin />}
    </div>
  );
};

export default AppNavbar;
