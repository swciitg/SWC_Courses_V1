import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import styles from "./CoursesBtn.module.css";

const CoursesBtn = (props) => {
  return (
    <Link to="/courses" style={{ textDecoration: "none" }}>
      <Button
        outline
        color="secondary"
        // size="lg"
        style={{
          padding: "10px",
          margin: "5% 15%",
          boxShadow: "1px 1px 1px rgba(46, 46, 46, 0.62)",
        }}
        className={styles.mobileBtn}
      >
        EXPLORE
      </Button>
    </Link>
  );
};

export default CoursesBtn;

// const useStyles = makeStyles({
//   MuiButtonRoot: {
//     padding: "8px 18px",
//     fontWeight: "500",
//     fontSize: "1.3rem",
//     margin: "14px 5px 0px",
//     color: "#fff",
//     backgroundColor: "#FFC205",
//     borderRadius: "25px",
//     outline: "0",
//     border: "none",
//     boxShadow:
//       "inset 4px 4px 6px -1px rgba(0, 0, 0, 0.25),inset -4px -4px 6px -1px rgba(255, 255, 255, 0.75), -0.5px -0.5px 0px rgba(0,0,0,0.45),0.5px 0.5px 0px rgba(0, 0, 0, 0.45)",
//     textShadow: "0.1px 0.1px 0.3px #000",
//     "&:focus": {
//       outline: "none",
//     },
//   },
// });
