import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { AuthContext, AuthProvider } from "../../../../contexts/AuthContext";
import styles from "./OutlookLogin.module.css";
import urls from "../../../../constants";

const OutlookLogin = (props) => {
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);

  const onSubmit = (e) => {
    window.open(urls.LOGIN, "_self");
  };

  return (
    <div>
      <Button
        outline
        color="secondary"
        // size="lg"
        style={{
          padding: "10px",
          margin: "5%",
          boxShadow: "1px 1px 1px rgba(46, 46, 46, 0.62)",
        }}
        onClick={onSubmit}
        className={styles.mobileBtn}
      >
        LOGIN
      </Button>
    </div>
  );
};

export default OutlookLogin;
