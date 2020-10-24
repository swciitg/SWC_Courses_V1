import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../../../contexts/AuthContext";

const useStyles = makeStyles({
  MuiButtonRoot: {
    padding: "15px 25px",
    fontWeight: "bold",
    fontSize: "1.1rem",
    margin: "12px 0px 0px",
  },
});

const ProfileButton = (props) => {
  const classes = useStyles();
  //   const history = useHistory();
  //   const [isLoggedIn, setisLoggedIn] = useContext(AuthContext);

  return (
    <Link to="/profile">
      <Button variant="outlined" size="large" className={classes.MuiButtonRoot}>
        PROFILE
      </Button>
    </Link>
  );
};

export default ProfileButton;
