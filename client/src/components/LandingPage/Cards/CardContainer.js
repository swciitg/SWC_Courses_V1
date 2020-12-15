import React from "react";
import Card from "./Card";
import styles from "./Cards.module.css";
import thumbnails from "../../../images/testImages";
import spinner from "../../../images/spinner.gif";

const CardContainer = ({ courses }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.containerTitle}>TOP COURSES</h1>
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
              imgScr={thumbnails[i]} // To be replaced by thumbnails from the DB, e.g.- {course.imgUrl}
              title={course.title}
              description={course.description}
              // imgScr={course.course_images[0][0]}
              // title={course.course_name}
              // description={course.course_headline}
              id={course._id}
            />
          );
        })
      )}
    </div>
  );
};

export default CardContainer;
