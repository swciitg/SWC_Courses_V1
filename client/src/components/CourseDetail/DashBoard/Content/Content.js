import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Content.module.css";
import classNames from "classnames";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Content = ({ details }) => {

  const [lessons, setLessons] = useState([]);
  const [hrs,setLessonHrs] = useState("");
  const [minutes,setLessonMin] = useState("");
  useEffect(() => {
    axios
      .get(`/api/courses/${details.id}`)
      .then((response) => {
        const Lessons = response.data.media;
        var time = 0; //seconds
        setLessons(Lessons);
        console.log(response.data.media);
        // console.log(Lessons);
        Lessons.forEach(lesson => {
          time += Number(lesson.duration);
        });
        time = time/60; //minutes
        var hours = (time / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        setLessonHrs(rhours);
        setLessonMin(rminutes);
        console.log("Lessons has been received!!");
      })
      .catch(() => {
        alert("Error retrieving Lessons!!");
      });
  }, []);

  return (
    <div className={classNames(styles.Content)}>
      <div className={styles.Content_box}>
        <div className={classNames(styles.Header)}>
          <span>CONTENTS</span>
          <span>
            {details.videos !== undefined && details.videos.length} Lessons
          </span>
          <span>{hrs == 0? minutes +" min" : hrs +" hrs"}</span>
        </div>
        <div className={styles.lessons}>
          <List className={styles.lesson}>
            {lessons.map((lesson,index) => {

        return (
          <ListItem  style={index%2? {background:"#ececec"}: {background:"#ffffff"}} >
            <ListItemText >{lesson.title}</ListItemText>
          </ListItem>
        );
      })}
          </List>
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
