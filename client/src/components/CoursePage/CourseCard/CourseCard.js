import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import styles from "./CourseCard.module.css";
import classNames from "classnames";

const CourseCard = (props) => {
  const { imgScr, title, description, id, videos, user } = props;

  return (
    <Link
      to={{
        pathname: `/courses/${id}/videos/${videos[0]}`,
        state: {
          details: {
            description: description,
            id: id,
            imgScr: imgScr,
            title: title,
            videos: videos,
          },
          user: user,
        },
      }}
      style={{ textDecoration: "none" }}
    >
      <Card className={classNames(styles.CourseCard, "border-light")}>
        <CardImg top width="100%" src={imgScr} alt="Card image cap" />
        <CardBody>
          <CardTitle>
            <h5>{title}</h5>
          </CardTitle>
          <CardText>
            <p>{description}</p>
          </CardText>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CourseCard;
