import React from "react";
import Card from "./Card";
import styles from "./Cards.module.css";
// import thumbnails from "../../../images/testImages";
import spinner from "../../../images/spinner.gif";

const CardContainer = ({ courses }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.containerTitle}>ALL COURSES</h1>
      {!courses.length ? (
        <div className={styles.center} style={{ height: "60vh" }}>
          <img src={spinner} alt="" width="150px" height="150px" />
        </div>
      ) : (
        courses.map((course, i) => {
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
        })
      )}
    </div>
  );
};

export default CardContainer;
