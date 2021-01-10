import React from "react";
import styles from "../HomeScreen.module.css";
import glass from "../../../../images/search-glass.png";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Card from "../../Cards/Card";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    height: "90%",
    backgroundColor: "#FEF49A",
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
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
  },
}));

const SearchBar = (props) => {
  const { courses } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
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
                imgScr={course.img}
                title={course.title}
                description={course.description}
                id={course._id}
                videos={course.videos}
              />
            );
          })}
        </div>
      ) : (
        <h6
          style={{
            textAlign: "center",
            fontFamily: "myUbuntu",
            fontSize: "1.3rem",
          }}
        >
          No courses found !!
        </h6>
      )}
    </div>
  );

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleOpen} style={{ position: "relative" }}>
        <img
          src={glass}
          alt="glass"
          style={{
            position: "absolute",
            top: "13%",
            left: "3%",
            transform: "scale(0.8)",
          }}
        />
        <input
          type="text"
          className={`mb-4 ${styles.hscrInput}`}
          name="dsearch"
          placeholder="Find courses ..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
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
