import React, { useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import newlogo from "../../../images/newlogo.svg";
import urls from "../../../constants";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  fullList: {
    width: "auto",
  },
}));

export default function Sidemenu() {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });

  const logoutHandler = () => {
    window.open(urls.LOGOUT, "_self");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <img src={newlogo} alt="logo" style={{ paddingLeft: "15px" }} />
        </ListItem>
        <ListItem button style={{ paddingLeft: "30px", margin: "4px 0" }}>
          <Link
            to="/courses"
            style={{
              textDecoration: "none",
              color: "#252f5a",
            }}
          >
            <ListItemText primary="HOME" />
          </Link>
        </ListItem>
        <ListItem button style={{ paddingLeft: "30px", margin: "4px 0" }}>
          <Link
            to="/courses/profile"
            style={{
              textDecoration: "none",
              color: "#252f5a",
            }}
          >
            <ListItemText primary="MY COURSES" />
          </Link>
        </ListItem>
        <ListItem button style={{ paddingLeft: "30px", margin: "4px 0" }}>
          <Link
            to="/courses/courses"
            style={{
              textDecoration: "none",
              color: "#252f5a",
            }}
          >
            <ListItemText primary="ALL COURSES" />
          </Link>
        </ListItem>
        <ListItem button style={{ paddingLeft: "30px", margin: "4px 0" }}>
          <Link
            to="/logout"
            style={{
              textDecoration: "none",
              color: "#252f5a",
            }}
          >
            <ListItemText primary="LOGOUT" onClick={logoutHandler} />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer("left", true)}>Left</Button> */}
      <IconButton
        edge="start"
        className={clsx(classes.menuButton)}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
