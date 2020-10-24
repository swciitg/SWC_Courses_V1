import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext, AuthProvider } from "../../../../contexts/AuthContext";
import axios from "axios";

const useStyles = makeStyles({
  MuiButtonRoot: {
    padding: "15px 25px",
    fontWeight: "bold",
    fontSize: "1.1rem",
    margin: "12px 0px 0px",
  },
});

const OutlookLogin = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);
  // const [isLoggedIn, setisLoggedIn] = useState(false);

  const onSubmit = (e) => {
    console.log("Login 1");
    axios.get("/auth/outlook").then((res) => {
      console.log("Login 2");
      console.log(res.data);
      setisLoggedIn((prev) => !prev);
      // history.push("/profile");
    });
    // window.location.replace("/profile"); // BAD PRACTICE !!!!!!!!
  };

  useEffect(() => {
    console.log("useEffect OutlookLogin");
  }, [isLoggedIn]);

  return (
    <div>
      <Button
        variant="outlined"
        size="large"
        className={classes.MuiButtonRoot}
        onClick={onSubmit}
      >
        Log In With Outlook
      </Button>
      {/* <Button variant="outlined" size="large" className={classes.MuiButtonRoot}>
        <a href="http://localhost:5000/auth/outlook">TRY</a>
      </Button> */}
    </div>
  );
};

export default OutlookLogin;
