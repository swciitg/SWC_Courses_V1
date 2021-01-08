import React, { Component } from "react";
import { Container } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styles from "./AdminCourseDetail.module.css";
import Button from "@material-ui/core/Button";

class AdminCourseDetail extends Component  {
  state = {
     course: [],
     title:'',
     author:'',
     description:''
   };
   GetCourses = () => {
     axios.get(`/api/courses/${this.props.match.params.id}`)
       .then((response) => {
         const data =response.data;
         this.setState({ course: data ,title:data.title,author:data.author,description:data.description});
         console.log('Data has been received!!');
       })
       .catch(() => {
         alert('Error retrieving data!!!');
       });
   }

componentDidMount = () => {
     this.GetCourses();
     console.log(this.state.course);
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

 deleteCourse = (e) => {
   const apiCall = () => {
     axios({
       method: "delete",
       url: `/api/admin/courses/${this.props.match.params.id}`,
       withCredentials: true,
     })
       .then((res) => {
         console.log('Course deleted successfully');
       })
       .catch((err) => {
         console.error(err);
       });
   };
   apiCall();
   window.open("http://localhost:3000/api/admin/courses");
 };
 handleSubmit = (e) => {
   e.preventDefault();

   const apiCall = () => {
     axios({
       method: "put",
       url: `/api/admin/courses/${this.props.match.params.id}`,
       data: {

         title: this.state.title,
         author:this.state.author,
         description: this.state.description
       },
       withCredentials: true,
     })
       .then((res) => {
       console.log('Data has been changed!!');
       alert('Data has been changed!');
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
        <Link to={{ pathname: "/api/admin/courses"}}>
          <span className={styles.plz}>BACK TO ALL COURSES</span>
        </Link>
      </Button>
      </div>
        <span>___________________________________________________________________________________________________________________________________________________________________________</span>
        <h1 className={styles.h1}>EDIT THIS  COURSE</h1>
      <div className={styles.container}>
      <form onSubmit={this.handleSubmit}>
            <label className={styles.input}>
              Course Title
              <input type="text" value={this.state.title} onChange={this.handleChangetitle} />
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
            <input type="submit" value="EDIT CURRENT DETAILS" />
          </form>
</div>
<br/>
    <div className={styles.button}>
    <Button>
      <Link to={{ pathname: `/api/admin/courses/${this.props.match.params.id}/videos`}}>
        <span className={styles.plz}>ADD VIDEOS FOR THE COURSE</span>
      </Link>
    </Button>
    </div>
    <br/>
    <form onSubmit={this.deleteCourse}>
      <input type="submit" value="DELETE THIS COURSE" className={styles.delete} />
      </form>
    </div>
    );
  }
}


export default AdminCourseDetail;
