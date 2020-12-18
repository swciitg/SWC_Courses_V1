import React, { Component } from "react";
import { Container } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";

class Courses extends Component  {
  state = {
     courses: [{title:"hdh"}]
   };

  componentDidMount = () => {
     this.GetCourses();
   };


   GetCourses = () => {
     axios.get('/api/admin/courses')
       .then((response) => {
         const data = response.data;
         this.setState({ courses: data });
         console.log('Data has been received!!');
       })
       .catch(() => {
         alert('Error retrieving data!!!');
       });
   }
   render(){
    const { courses } = this.state.courses;
    const courseList = courses.map(course => {
      return (
        <div className="ninja" key={course.id}>
          <div>Name: { course.title }</div>
          <div>Age: { course.author }</div>
          <div>Belt: { course.description }</div>
        </div>
      )
    });
    return (
      <div className="ninja-list">
        { courseList }
      </div>
    );
  }
}


export default Courses;
