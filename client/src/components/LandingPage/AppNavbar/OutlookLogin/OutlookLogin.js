import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { AuthContext, AuthProvider } from "../../../../contexts/AuthContext";
import styles from "./OutlookLogin.module.css";

const OutlookLogin = (props) => {
  const { isLoggedIn, setisLoggedIn } = useContext(AuthContext);

  const onSubmit = (e) => {
    window.open("http://localhost:5000/auth/outlook", "_self");
  };

  return (
    <div>
      <Button
        outline
        color="secondary"
        // size="lg"
        style={{
          padding: "10px",
          margin: "5%",
          boxShadow: "1px 1px 1px rgba(46, 46, 46, 0.62)",
        }}
        onClick={onSubmit}
        className={styles.mobileBtn}
      >
        LOGIN
      </Button>
    </div>
  );
};

export default OutlookLogin;

// const useStyles = makeStyles({
//   MuiButtonRoot: {
//     padding: "10px 25px",
//     fontWeight: "bold",
//     fontSize: "1.1rem",
//     margin: "12px 5px 0px",
//     color: "#fff",
//     backgroundColor: "orange",
//     boxShadow:
//       "inset 4px 4px 6px -1px rgba(0, 0, 0, 0.25),inset -4px -4px 6px -1px rgba(255, 255, 255, 0.75), -0.5px -0.5px 0px rgba(0,0,0,0.45),0.5px 0.5px 0px rgba(0, 0, 0, 0.45)",
//     textShadow: "0.1px 0.1px 0.3px #000",
//     "&:hover": {
//       color: "orange",
//     },
//     "&:focus": {
//       outline: "none",
//     },
//   },
// });
