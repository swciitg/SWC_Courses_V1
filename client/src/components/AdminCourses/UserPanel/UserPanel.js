import React from "react";
import styles from "./UserPanel.module.css";
import leftArrow from "../../../images/left-arrow.png";
import { Link } from "react-router-dom";
import UsersTable from "./UsersTable";
import axios from "axios";

const UserPanel = () => {
  return (
    <div className={styles.userPanelRoot}>
      <div className={styles.topBar}>
        <Link to="/admin/courses">
          <button className={styles.BackButton}>
            <img src={leftArrow} alt="back" />
          </button>
        </Link>
        <h1
          style={{
            textAlign: "center",
            fontSize: "4rem",
            color: "#999",
            marginTop: "25px",
            fontWeight: "300",
          }}
        >
          USER PANEL
        </h1>
      </div>
      <div className={styles.tableContainer}>
        <UsersTable />
      </div>
    </div>
  );
};

export default UserPanel;
