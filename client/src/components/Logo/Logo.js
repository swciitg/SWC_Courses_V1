import React from "react";
import logo from "../../images/logo.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <a href="/" className="ml-auto ml-md-0 mr-auto">
      <img src={logo} alt="logo" className={styles.Logo} />
    </a>
  );
};

export default Logo;
