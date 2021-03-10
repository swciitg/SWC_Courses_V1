import React from "react";
import Card from "./Card";
import styles from "./Cards.module.css";
import Link from '@material-ui/core/Link';
// import thumbnails from "../../../images/testImages";
import spinner from "../../../images/spinner.gif";
import Button from '@material-ui/core/Button';


const CardContainer = ({ courses }) => {
  function blueColor(e) {
      e.target.style.color = 'rgb(74, 142, 255, 1)';
  }
  function greyColor(e) {
      e.target.style.color = 'rgb(142, 142, 142, 1)';
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.containerTitle}>Top Courses</h1>
      {/* <div className={styles.categoryContainer}>
          <Button  className={styles.category} >Design</Button>
          <Button className={styles.category}>FrontEnd</Button>
          <Button  className={styles.category}>Serverside</Button>
          <Button className={styles.category}>Android</Button>
          <Button className={styles.category}>Productivity</Button>
      </div> */}
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
              imgScr={course.imgPath}
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
