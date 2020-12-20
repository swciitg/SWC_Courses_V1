import React, { Component } from "react";
import { Container } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CourseDetail from "../CourseDetail/CourseDetail";
import styles from "./Courses.module.css";
import Button from "@material-ui/core/Button";
import AppNavbar from "../CoursePage/AppNavbar/AppNavbar";

class Courses extends Component  {
  state = {
     courses: []
   };
   GetCourses = () => {
     axios.get('/api/admin/courses')
       .then((response) => {
         const data = response.data.courses;
         this.setState({ courses: data });
         console.log('Data has been received!!');
       })
       .catch(() => {
         alert('Error retrieving data!!!');
       });
   }

  componentDidMount = () => {
     this.GetCourses();
     console.log(this.state.courses);
   };

   displaycourselist = (courses) => {

    if (!courses.length) return null;


    return courses.map((course) => (
      <div key={course._id} className="blog-post__display">
      <div class="col-sm-6 col-md-4 col-lg-3 mt-4">
            <div class="card" id="cards">
               <img class="card-img-top" src="https://picsum.photos/200/150/?random" />
                <div class="card-block">
                    <h3 class="card-title">{course.title}</h3>
                    <div class="meta">
                        <h5>{course.author}</h5>
                    </div>
                    <div class="card-text">
                        <p>{course.description}</p>
                    </div>
                    <div>
                     <Button size="small" color="primary">
                       <Link to={{ pathname: `/courses/${course._id}`}}>
                         Learn more
                       </Link>
                     </Button>
                     </div>
                </div>
            </div>
        </div>
      </div>
    ));
  };


   render(){
    return (
      <div className={styles.App}>
        <AppNavbar />
        <div className="blog" id="cards" >
          {this.displaycourselist(this.state.courses)}
        </div>
        </div>
    );
  }
}


export default Courses;
