import React, { useContext, useEffect } from "react";
import styles from "./AdminBtn.module.css";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const AdminBtn = (props) => {
  return (
    <div>
      <Link
        to={{ pathname: "/admin/courses" }}
        style={{ textDecoration: "none" }}
      >
        <Button
          outline
          color="secondary"
          // size="lg"
          style={{
            padding: "10px",
            marginRight: "4px",
            boxShadow: "1px 1px 1px rgba(46, 46, 46, 0.62)",
          }}
          className={styles.mobileBtn}
        >
          ADMIN
        </Button>
      </Link>
    </div>
  );
};

export default AdminBtn;
