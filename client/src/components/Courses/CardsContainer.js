import React from "react";
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import styles from "./Courses.module.css";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

const CardsContainer = (props) => {
  const { courses, newcourses, inputvalue } = props;

  const displaycourselist = (courses) => {
    const newcourses = courses.filter((course) => {
      return course.title.toLowerCase().includes(inputvalue.toLowerCase());
    });
    if (!newcourses.length) {
      return [1, 2, 3].map((val) => {
        return (
          <Skeleton
            variant="rect"
            width={256}
            height={360}
            style={{
              width: "16rem",
              height: "22.5rem",
              padding: "1rem",
              margin: "1rem",
              borderRadius: "4px",
            }}
            key={val}
          />
        );
      });
    }

    return newcourses.map((course) => (
      <Link
        to={{
          pathname: `/courses/courses/${course._id}`,
          state: {
            description: course.description,
            id: course._id,
            imgScr: course.imgPath,
            title: course.title,
            videos: course.videos,
            author: course.author,
          },
        }}
        style={{ textDecoration: "none" }}
      >
        <Card className={classNames(styles.CourseCard, "border-light")}>
          <CardImg top width="100%" src={course.imgPath} alt="Card image cap" />
          <CardBody>
            <CardTitle>
              <h5>{course.title}</h5>
            </CardTitle>
            <CardText>
              <p>{course.description}</p>
            </CardText>
          </CardBody>
        </Card>
      </Link>
    ));
  };

  return (
    <Container className={classNames(styles.Container, "py-5")}>
      <h2 style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}>
        ALL COURSES
      </h2>
      <Container
        className="d-flex"
        style={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {displaycourselist(courses)}
      </Container>
    </Container>
  );
};

export default CardsContainer;
