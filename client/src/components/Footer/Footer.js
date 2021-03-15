import React, { useState, useEffect, useContext } from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <div className={styles.footerContainer}>
      <p className={styles.footerText}><span>&#169;</span> 2021 <a className={styles.footerLink} src="https://www.facebook.com/swciitg/" >@student-web-commitee</a></p>
    </div>
  );
};

export default Footer;
