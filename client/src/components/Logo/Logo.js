import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import styles from "./Logo.module.css";
import classNames from "classnames";

const Logo = () => {
  return (
    <Link
      to="/"
      className={classNames("ml-auto", "ml-md-0", "mr-auto", styles.root)}
    >
      <img src={logo} alt="logo" className={styles.Logo} />
    </Link>
  );
};

export default Logo;
