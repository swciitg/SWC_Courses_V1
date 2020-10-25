import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext, AuthProvider } from "../../../../contexts/AuthContext";

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
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);

  const onSubmit = (e) => {
    window.open("http://localhost:5000/auth/outlook", "_self");
  };

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
    </div>
  );
};

export default OutlookLogin;
