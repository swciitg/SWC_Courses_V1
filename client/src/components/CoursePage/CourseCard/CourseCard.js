import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import styles from './CourseCard.module.css';
import classNames from 'classnames';

const CourseCard = (props) => {
    return (
        <Link to="/courses/123" style={{ "text-decoration": "none" }}>
            <Card className={classNames(styles.CourseCard, "border-light")}>
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                <CardBody>
                    <CardTitle><h5>props.title</h5></CardTitle>
                    <CardText><p>props.description</p></CardText>
                </CardBody>
            </Card>
        </Link>
    )
}

export default CourseCard;
