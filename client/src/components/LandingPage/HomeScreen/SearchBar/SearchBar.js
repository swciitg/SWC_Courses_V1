import React, { useState, useContext } from "react";
import styles from "../HomeScreen.module.css";
import glass from "../../../../images/search-glass.png";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Card from "../../Cards/Card";
import CNFImg from "../../../../images/coursesnotfound.svg";
import { AuthContext } from "../../../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    height: "90%",
    border: "#edf8ff 7px solid",
    borderRadius: 30,
    backgroundColor: "#ffffff",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/checkered-light-emboss.png')",
    // backdropFilter: "grayscale(0.5) opacity(1)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "5%",
    left: "10%",
    overflowY: "auto",
    ["@media (max-width: 550px)"]: {
      width: "90%",
      left: "5%",
    },
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const SearchBar = (props) => {
  const { courses } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { isLoggedIn } = useContext(AuthContext);

  const handleOpen = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      setOpen(true);
    } else {
      alert("Please login to access the courses.");
    }
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const searchList = courses.filter((course) => {
    return course.title.toLowerCase().includes(search.toLowerCase());
  });

  const body = (
    <div className={classes.paper}>
      <h2
        id="simple-modal-title"
        style={{
          textAlign: "center",
          margin: "10px 0 15px",
          color: "#1B3D2F",
          fontFamily: "myUbuntu",
          fontSize: "3rem",
        }}
      >
        Search Results
      </h2>
      {searchList.length ? (
        <div className={styles.cardContainer}>
          {searchList.map((course, i) => {
            return (
              <Card
                key={i}
                name={`simple-controlled-${i}`}
                imgScr={course.imgPath}
                title={course.title}
                description={course.description}
                id={course._id}
                videos={course.videos}
              />
            );
          })}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "50%", height: "50%", clipPath: "inset(0 0 6% 0)" }}
            src={CNFImg}
          />
          <h6
            style={{
              textAlign: "center",
              fontFamily: "myUbuntu",
              fontSize: "1.3rem",
            }}
          >
            No courses found.
          </h6>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ scale: "1.3" }} className={styles.searchBar}>
      <form onSubmit={handleOpen} style={{ position: "relative" }}>
        <input
          type="text"
          className={(`mb-4 ${styles.hscrInput}`, styles.todoinput)}
          name="dsearch"
          placeholder="Search for courses"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img
          src={glass}
          alt="glass"
          className={styles.todobtn}
          style={{
            position: "absolute",
            top: "5%",
            width: "3.1rem",
            height: "3.1rem",
            right: "1%",
          }}
          onClick={handleOpen}
        />
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SearchBar;
