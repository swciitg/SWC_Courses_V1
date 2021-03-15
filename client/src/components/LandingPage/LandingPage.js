import React, { useContext } from "react";
import LandingNav from "./AppNavbar/LandingNav";
import HomeScreen from "./HomeScreen/HomeScreen";
import Footer from "../Footer/Footer";
import styles from "./LandingPage.module.css";
import CardContainer from "./Cards/CardContainer";
import ErrorBoundary from "../../hoc/ErrorBoundary";
import { CoursesContext } from "../../contexts/CoursesContext";

const LandingPage = (props) => {
  // const [courses, setCourses] = useState([]);
  const { courses } = useContext(CoursesContext);

  return (
    <div className={styles.root}>
      <div className={styles.App}>
        <LandingNav />
        <HomeScreen courses={courses} />
      </div>
      <ErrorBoundary>
        <CardContainer courses={courses} />
      </ErrorBoundary>
      <Footer/>
    </div>
  );
};

export default LandingPage;
