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
import CardContainer from "../LandingPage/Cards/CardContainer";
import ErrorBoundary from "../../hoc/ErrorBoundary";


class Courses extends Component  {
  state = {
     courses: [],
     inputvalue : '',
     newcourses:[]
   };
   GetCourses = () => {
     axios.get('/api/admin/courses')
       .then((response) => {
         const data = response.data.courses;
         this.setState({ courses: data ,newcourses: data });
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
     const newcourses = this.state.courses.filter(course =>{
       return course.title.toLowerCase().includes(this.state.inputvalue.toLowerCase())
     });
     this.setState({ newcourses: newcourses });
   };


   render(){
    return (
      <div className={styles.App}>
        <AppNavbar />
        <span>___________________________________________________________________________________________________________________________________________________________________________</span>
        <br/><br/>
        <div>
        <label htmlFor="search"> </label>
        <input type = "text" value = {this.state.inputvalue} onChange= {this.filterchange} placeholder = "SEARCH  BY  NAME" className={styles.search} />
        </div>
        <br/>
        <ErrorBoundary>
          <CardContainer courses={this.state.newcourses} />
        </ErrorBoundary>
        </div>
    );
  }
}


export default Courses;
