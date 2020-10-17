import React from "react";
import { Navbar, NavLink, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import leftArrow from "../../../../images/left-arrow.png";
import avatar from "../../../../images/avatar.png";
import tick from "../../../../images/tick-mark.png";
import styles from "./Header.module.css";
import classNames from "classnames";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

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

const Header = ({ details }) => {
  const classes = useStyles();

  const imgScr = details.imgScr;
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
            <span className={styles.Dashboard}>DASHBOARD</span>
          </span>

          <span
            className="d-none d-sm-inline"
            style={{ textShadow: "0.2px 0.2px 1px white" }}
          >
            Welcome Pranjal !!
          </span>

          <Link to="/profile">
            <NavLink className={styles.Avatar}>
              {/* <img src={avatar} alt="avatar" /> */}
              <Avatar
                alt="Pranjal Chourasia"
                className={classes.large}
                src="https://avatars2.githubusercontent.com/u/61688724?s=460&u=68e84273c6f21f94ebf24f4fc500e4df115378b4&v=4"
              />
            </NavLink>
          </Link>
        </nav>

        <div class="container-fluid pl-sm-5">
          <h2 className={styles.Title}>{details.title}</h2>

          <Navbar className="justify-content-start px-0 d-flex">
            <span className="d-inline-block">
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
            <div></div>
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
