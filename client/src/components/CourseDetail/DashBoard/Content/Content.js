import React from "react";
import styles from "./Content.module.css";
import classNames from "classnames";

const Content = ({ details }) => {
  return (
    <div className={classNames(styles.Content)}>
      <div className={styles.Content_box}>
        <div className={classNames(styles.Header)}>
          <span>CONTENTS</span>
          <span>
            {details.videos !== undefined && details.videos.length} Lessons
          </span>
          <span>_ hrs</span>
        </div>
        <div className={styles.lessons}>
          <p>ENROL-- GO TO COURSE-- GET STARTED</p>
        </div>
      </div>
      <div className={classNames(styles.Description)}>
        <div>About</div>
        <p>{details.description}</p>
      </div>
    </div>
  );
};

export default Content;

// "row d-flex px-4 px-sm-5", "col col-4 d-md-block pr-5", "col col-4 d-md-block pr-5","d-flex pl-2 pl-lg-0",
