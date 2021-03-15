import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Sidemenu from "./Sidemenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const { user, details } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ background: "#252f5a" }}>
        <Toolbar>
          <Sidemenu />
          <Typography variant="h6" className={classes.title}>
            {/* <Link
              to={{ pathname: `/courses/${details.id}`, state: props }}
              style={{ textDecoration: "none", color: "#fff" }}
            > */}
            {details.title}
            {/* </Link> */}
          </Typography>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Avatar alt={user.name !== undefined && user.name} src="#" />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
