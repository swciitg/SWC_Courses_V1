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
     courses: [],
     inputvalue : ''
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

   filterchange = (event) => {
     console.log("hello",event.target.value)
     this.setState({
       inputvalue: event.target.value
     })
   };

   displaycourselist = (courses) => {
    const newcourses = this.state.courses.filter(course =>{
      return course.title.toLowerCase().includes(this.state.inputvalue.toLowerCase())
    });
    if (!newcourses.length) return (
      <div className={styles.nocourse}>
      No Courses Found
      </div>
    );


    return newcourses.map((course) => (
      <div key={course._id} className={styles.blog}>
      <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
            <div className="card" id="cards">
               <img className="card-img-top" src="https://picsum.photos/200/150/?random" />
                <div className="card-block">
                    <h3 className="card-title">{course.title}</h3>
                    <div className="meta">
                        <h5>{course.author}</h5>
                    </div>
                    <div className="card-text">
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
        <span>___________________________________________________________________________________________________________________________________________________________________________</span>
        <br/>
        <div>
        <label htmlFor="search"> SEARCH BY NAME</label>
        <input type = "text" value = {this.state.inputvalue} onChange= {this.filterchange} placeholder = "" />
        </div>
        <div className="blog" id="cards" >
          {this.displaycourselist(this.state.courses)}
        </div>
        </div>
    );
  }
}


export default Courses;
