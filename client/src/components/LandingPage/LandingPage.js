import React, { useContext } from "react";
import LandingNav from "./AppNavbar/LandingNav";
import HomeScreen from "./HomeScreen/HomeScreen";
import Footer from "../Footer/Footer";
import styles from "./LandingPage.module.css";
import CardContainer from "./Cards/CardContainer";
import ErrorBoundary from "../../hoc/ErrorBoundary";
import { CoursesContext } from "../../contexts/CoursesContext";
import { AuthContext } from "../../contexts/AuthContext";

const LandingPage = (props) => {
  const { courses } = useContext(CoursesContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.root}>
      <div className={styles.App}>
        <LandingNav />
        <HomeScreen courses={courses} />
      </div>
      {isLoggedIn ? (
        <ErrorBoundary>
          <CardContainer courses={courses} />
        </ErrorBoundary>
      ) : null}

      <Footer />
    </div>
  );
};

export default LandingPage;
