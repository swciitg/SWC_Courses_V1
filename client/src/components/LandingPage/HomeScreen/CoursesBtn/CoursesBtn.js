import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  MuiButtonRoot: {
    padding: "8px 18px",
    fontWeight: "500",
    fontSize: "1.3rem",
    margin: "14px 5px 0px",
    color: "#fff",
    backgroundColor: "#FFC205",
    borderRadius: "25px",
    outline: "0",
    border: "none",
    boxShadow:
      "inset 4px 4px 6px -1px rgba(0, 0, 0, 0.25),inset -4px -4px 6px -1px rgba(255, 255, 255, 0.75), -0.5px -0.5px 0px rgba(0,0,0,0.45),0.5px 0.5px 0px rgba(0, 0, 0, 0.45)",
    textShadow: "0.1px 0.1px 0.3px #000",
    "&:focus": {
      outline: "none",
    },
  },
});

const CoursesBtn = (props) => {
  const classes = useStyles();

  return (
    <Link to="/courses" style={{ textDecoration: "none" }}>
      <Button variant="outlined" size="large" className={classes.MuiButtonRoot}>
        EXPLORE COURSES
      </Button>
    </Link>
  );
};

export default CoursesBtn;
