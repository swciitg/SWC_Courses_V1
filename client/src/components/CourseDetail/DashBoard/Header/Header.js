import React, { useContext, useEffect, useState } from "react";
import Aux from "../../../../hoc/Auxilary";
import { Navbar, NavLink, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import leftArrow from "../../../../images/left-arrow.png";
import styles from "./Header.module.css";
import classNames from "classnames";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../../../contexts/AuthContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Header = (props) => {
  const { details, user, fname, enrolCourse, isEnrolled } = props;
  // state imported from the AuthContext hoc
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const imgScr = details.imgScr;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div
      className={styles.Header_wrapper}
      style={{
        backgroundImage: `url(${imgScr})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header
        className={classNames("px-3", "pl-lg-3", "pr-lg-5", styles.Header)}
        style={{
          backdropFilter: "blur(9px)",
        }}
      >
        <nav
          className={classNames(
            "navbar",
            "navbar-light",
            "d-flex",
            styles.Navbar
          )}
        >
          <span className="mr-auto">
            {/* <Link to="/">
              <button className={styles.BackButton}>
                <img src={leftArrow} alt="back" />
              </button>
            </Link> */}
            <span
              className={classNames(
                styles.Dashboard,
                "d-none",
                "d-sm-inline-block"
              )}
            >
              {details.title}
            </span>
          </span>

          {/* {isLoggedIn ? (
            <Aux>
              <span
                className="d-none d-sm-inline"
                style={{ textShadow: "0.2px 0.2px 1px white" }}
              >
                Welcome {fname} !!
              </span>

              <Link to="/profile" style={{ textDecoration: "none" }}>
                <NavLink className={styles.Avatar}>
                  <Avatar alt={user.name} src="#" />
                </NavLink>
              </Link>
            </Aux>
          ) : (
            <span
              className="d-none d-sm-inline"
              style={{ textShadow: "0.2px 0.2px 1px white" }}
            >
              Welcome Visitor !!
            </span>
          )} */}
        </nav>

        <div class="container-fluid pl-sm-5">
          <h2 className={styles.Title}>{details.author}</h2>

          <Navbar className="justify-content-start px-0 d-flex">
            <span className="d-none d-sm-inline-block">
              <Badge
                className={classNames(
                  "badge-pill",
                  styles.Badge,
                  "badge-light"
                )}
              >
                CSS
              </Badge>
              <Badge
                className={classNames(
                  "badge-pill",
                  styles.Badge,
                  "badge-light"
                )}
              >
                Bootstrap
              </Badge>
              <Badge
                className={classNames(
                  "badge-pill",
                  styles.Badge,
                  "badge-light",
                  "my-1"
                )}
              >
                Javascript
              </Badge>
            </span>
            <span
              style={{
                display: isLoggedIn ? "block" : "none",
              }}
              className={styles.Enrol_span}
            >
              {isEnrolled ? (
                <Link
                  to={{
                    pathname: `/courses/${details.id}/videos/${details.videos[0]}`,
                    state: {
                      details: details,
                      user: user,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <button className={styles.Enrol_button}>GO TO COURSE</button>
                </Link>
              ) : (
                <button
                  className={styles.Enrol_button}
                  onClick={() => {
                    enrolCourse();
                    setOpen(true);
                  }}
                >
                  ENROL
                </button>
              )}
            </span>
          </Navbar>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message="Enrolled successfully !!"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </header>
    </div>
  );
};

export default Header;
