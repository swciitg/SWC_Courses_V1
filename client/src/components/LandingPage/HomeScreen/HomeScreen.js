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
        <div className={`col-8 col-md-8 col-lg-7 px-5 py-5 ${styles.introBlock}`}>
          <p
            id="introPara"
            className={`text-center text-sm-left ${styles.introPara}`}
          >
            A simple and sweet learning platform.
          </p>
          <SearchBar courses={courses} />
        </div>
        <image></image>
        <div class="container-fluid pl-2 pl-md-5 text-center text-sm-left d-none d-sm-block mt-4">
            <div class="row">
              <div class="col-4"></div>
              <div class="col-4"></div>
              <div class="col-4"></div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default HomeScreen;
