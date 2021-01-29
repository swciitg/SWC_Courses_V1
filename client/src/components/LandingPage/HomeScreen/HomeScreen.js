import React, { useEffect } from "react";
import styles from "./HomeScreen.module.css";
import SearchBar from "./SearchBar/SearchBar";
// ${styles.HomeScreen}

const HomeScreen = (props) => {
  const { courses } = props;

  // useEffect(() => {
  //   console.log("HScrn loaded", courses);
  // }, [courses]);

  return (
    <div
      id="content"
      className={`container-fluid pb-4 d-flex align-items-center px-4 pl-md-5 ${styles.content}`}
    >
      <div className="row">
        <div className={`col-12 col-md-7 col-lg-6 px-5 ${styles.introBlock}`}>
          <p
            id="introPara"
            className={`text-center text-sm-left ${styles.introPara}`}
          >
            A simple and sweet learning platform, build for the campus. Access
            to various premium online courses and learning material covering
            skills from basic to advanced. Collaborate with peers and experts.
          </p>
          <SearchBar courses={courses} />
          <div class="container-fluid pl-2 pl-md-5 text-center text-sm-left d-none d-sm-block mt-4">
            <h4>Top Grossing</h4>
            <div id="linkWrapper" class="d-flex flex-column">
              <a href="#">Javascript</a>
              <a href="#">CSS</a>
              <a href="#">Machine Learning</a>
              <a href="#">Django</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
