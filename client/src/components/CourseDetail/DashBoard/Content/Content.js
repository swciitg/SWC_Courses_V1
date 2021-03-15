import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Content.module.css";
import classNames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { AuthContext } from "../../../../contexts/AuthContext";

const Content = ({ details }) => {
  const [lessons, setLessons] = useState([]);
  const [hrs, setLessonHrs] = useState("");
  const [minutes, setLessonMin] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`/api/courses/${details.id}`)
      .then((response) => {
        const Lessons = isLoggedIn ? response.data.media : response.data.videos;
        var time = 0; //seconds
        setLessons(Lessons);
        // console.log(Lessons);
        Lessons.forEach((lesson) => {
          time += Number(lesson.duration);
        });
        time = time / 60; //minutes
        var hours = time / 60;
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        setLessonHrs(rhours);
        setLessonMin(rminutes);
      })
      .catch((e) => {
        console.log("Error retrieving Lessons!!", e);
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
          <span>{hrs == 0 ? minutes + " min" : hrs + " hrs"}</span>
        </div>
        <div className={styles.lessons}>
          <List className={styles.lesson}>
            {lessons.map((lesson, index) => {
              return (
                <ListItem
                  key={index}
                  style={
                    index % 2
                      ? { background: "#ececec" }
                      : { background: "#ffffff" }
                  }
                  className={styles.lessonOfList}
                >
                  <ListItemText>{lesson.title}</ListItemText>
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
