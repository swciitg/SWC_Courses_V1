import React, { useContext, useEffect } from "react";
import Aux from "../../../../hoc/Auxilary";
import { Navbar, NavLink, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import leftArrow from "../../../../images/left-arrow.png";
import tick from "../../../../images/tick-mark.png";
import styles from "./Header.module.css";
import classNames from "classnames";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../../../contexts/AuthContext";
import { indexOf } from "ffmpeg-static";
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
  const { details, user, fname, courseIDs } = props;
  // state imported from the AuthContext hoc
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);

  const classes = useStyles();

  const imgScr = details.imgScr;

  const enrolCourse = (e) => {
    axios.get(`/api/courses/${details.id}/enrol`).then((res) => {
      console.log(res.data);
      window.location.reload();
    });
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
            <Link to="/">
              <button className={styles.BackButton}>
                <img src={leftArrow} alt="back" />
              </button>
            </Link>
            <span
              className={classNames(
                styles.Dashboard,
                "d-none",
                "d-sm-inline-block"
              )}
            >
              DASHBOARD
            </span>
          </span>

          {isLoggedIn ? (
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
          )}
        </nav>

        <div class="container-fluid pl-sm-5">
          <h2 className={styles.Title}>{details.title}</h2>

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
              {/* <Badge
              className={classNames("badge-pill", styles.Badge, "badge-light")}
            >
              Udemy
            </Badge> */}
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
              {courseIDs.includes(details.id) ? (
                /* change the route to the streaming pages */
                <Link
                  to={{
                    pathname: `/courses/${details.id}/videos/${details.videos[0]}`,
                    state: props,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <button className={styles.Enrol_button}>GO TO COURSE</button>
                </Link>
              ) : (
                <button className={styles.Enrol_button} onClick={enrolCourse}>
                  ENROL
                </button>
              )}
            </span>
          </Navbar>
        </div>
      </header>
    </div>
  );
};

export default Header;

// const button = <Button id="enrol" className={classNames("btn", "btn-lg", "btn-dark", "ml-auto", "pl-4", "pr-3", "py-2", styles.Enrol, styles.Enrolled)}>Enrolled<img src={tick} alt="" /></Button>

// <Link href="/courses/:id/enrol" className="ml-auto">
//     <Button className={classNames("btn", "btn-lg", "btn-dark", "ml-auto", "pl-4", "pr-3", "py-2", styles.Enrol)}>Enrol</Button>
// </Link>
