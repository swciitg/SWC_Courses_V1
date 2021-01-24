import React, { Component } from "react";
import { Container } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styles from "./AdminCourses.module.css";
import Button from "@material-ui/core/Button";

class AdminCourses extends Component  {
  state = {
     courses: [],
     inputvalue : '',
     title:'',
     author:'',
     description:''
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
   handleChangetitle =(event) => {
   this.setState({title: event.target.value})
 };
 handleChangeauthor=(event) =>{
   this.setState({author: event.target.value})
 };
 handleChangedescription = (event) =>{
   this.setState({description: event.target.value})
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
      <div  className={styles.blog}>
            <div className="card" id="cards">
                <div className="card-block">
                    <h4 className="card-title">Course Name :{course.title}</h4>
                    <div className="meta">
                        <h7>Course Author :{course.author}</h7>
                    </div>
                    <div>
                     <Button size="small" color="primary">
                       <Link to={{ pathname: `/api/admin/courses/${course._id}`}}>
                         Edit/Delete  Details
                       </Link>
                     </Button>
                     </div>
                </div>
            </div>
      </div>
    ));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const apiCall = () => {
      axios({
        method: "post",
        url: "/api/admin/courses/",
        data: {

          title: this.state.title,
          author:this.state.author,
          description: this.state.description
        },
        withCredentials: true,
      })
        .then((res) => {
        console.log('Data has been added!!');
        alert('Data has been added!');
        })
        .catch((err) => {
          console.error(err);
        });
    };
    apiCall();
    window.location.reload(false);

  };

   render(){
    return (
      <div className={styles.App}>
      <br/>
      <div className={styles.home}>
      <Button>
        <Link to={{ pathname: "/"}}>
          <span className={styles.plz}>BACK TO HOMEPAGE</span>
        </Link>
      </Button>
      </div>
        <span>___________________________________________________________________________________________________________________________________________________________________________</span>
        <br/>

      <div className={styles.container}>
      <form onSubmit={this.handleSubmit}>
      <fieldset>
      <legend>
      <h1 className={styles.h1}>ADD  NEW  COURSES</h1>
      </legend>
            <label className={styles.input}>
              Course Title
              <input type="text" value={this.state.title} onChange={this.handleChangetitle}/>
            </label>
            <label  className={styles.input}>
              Course Author
              <input type="text" value={this.state.author} onChange={this.handleChangeauthor} />
            </label>
            <br/>
            <label className={styles.area}>
              Course Description
              <textarea value={this.state.description} onChange={this.handleChangedescription} />
            </label>
            <br/>
            <input type="submit" value="Submit" />
            </fieldset>
          </form>
</div>
        <span>___________________________________________________________________________________________________________________________________________________________________________</span>
        <br/>
        <div>
        <form>
        <fieldset>
        <legend>
        <h1 className={styles.containerTitle}>ALL COURSES</h1>
        </legend>
        <input type="text" className={`mb-4 ${styles.hscrInput}`} placeholder="Find courses ..." onChange= {this.filterchange} value = {this.state.inputvalue} />
        </fieldset>
        </form>
        </div>
        <div className={styles.card} id="cards" >
          {this.displaycourselist(this.state.courses)}
        </div>
        </div>

    );
  }
}


export default AdminCourses;
