import React, { Component } from "react";
import { Container } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styles from "./AdminCourseDetail.module.css";
import Button from "@material-ui/core/Button";
import { useAlert } from "react-alert";
import Table from "@material-ui/core/Table";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class AdminCourseDetail extends Component {
  state = {
    course: [],
    title: "",
    author: "",
    description: "",
    videos: [],
  };

  GetCourses = () => {
    axios
      .get(`/api/courses/${this.props.match.params.id}`)
      .then((response) => {
        const data = response.data;

        console.log(response.data);
        this.setState({
          course: data,
          title: data.title,
          author: data.author,
          description: data.description,
          videos: data.videos,
        });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!!");
      });
  };

  componentDidMount = () => {
    this.GetCourses();
    console.log(this.state.course);
  };

  handleChangetitle = (event) => {
    this.setState({ title: event.target.value });
  };
  handleChangeauthor = (event) => {
    this.setState({ author: event.target.value });
  };
  handleChangedescription = (event) => {
    this.setState({ description: event.target.value });
  };

  deleteCourse = (e) => {
    if (
      window.confirm(
        "Are you sure you wish to delete this course permanentaly?"
      )
    ) {
      const apiCall = () => {
        axios({
          method: "delete",
          url: `/api/admin/courses/${this.props.match.params.id}`,
          withCredentials: true,
        })
          .then((res) => {
            console.log("Course deleted successfully");
          })
          .catch((err) => {
            console.error(err);
          });
      };

      apiCall();
      window.open("http://localhost:3000/admin/courses", "_self");
    }
  };
  displayvideolist = (videos) => {

    if (!videos.length)
      return <div className={styles.nocourse}>No Videos Found</div>;
    return videos.map((video) => (
      <tr className={styles.cell}>
  <td>{video.title}</td>
  <td>{video.viewcount}</td>
  <td>{video.duration}</td>
 </tr>
));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const apiCall = () => {
      axios({
        method: "put",
        url: `/api/admin/courses/${this.props.match.params.id}`,
        data: {
          title: this.state.title,
          author: this.state.author,
          description: this.state.description,
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log("Data has been changed!!");
          alert("Data has been changed!");
        })
        .catch((err) => {
          console.error(err);
        });
    };
    apiCall();
    window.location.reload(false);
  };

  render() {
    return (
      <div className={styles.App}>
        <br />
        <form onSubmit={this.deleteCourse}>
          <input
            type="submit"
            value="DELETE THIS COURSE"
            className={styles.delete}
          />
        </form>
        <div className={styles.home}>
          <Button className={styles.plz}>
            <Link to={{ pathname: "/admin/courses" }}>
              <span className={styles.font}>BACK TO ALL COURSES</span>
            </Link>
          </Button>
          </div>


        <span>
          _______________________________________________________________________________________________________________________________________________________________________________
        </span>

        <div className={styles.container}>
          <form onSubmit={this.handleSubmit}>
            <legend>
              <h1 className={styles.h1}>EDIT THIS COURSE</h1>
            </legend>
            <label className={styles.input}>
              Course Title
              <input
                type="text"
                value={this.state.title}
                onChange={this.handleChangetitle}
              />
            </label>
            <label className={styles.input}>
              Course Author
              <input
                type="text"
                value={this.state.author}
                onChange={this.handleChangeauthor}
              />
            </label>
            <br />
            <label className={styles.area}>
              Course Description
              <textarea
                value={this.state.description}
                onChange={this.handleChangedescription}
              />
            </label>
            <br />
            <input type="submit" value="EDIT CURRENT DETAILS" />
          </form>
        </div>
        <span>
          _______________________________________________________________________________________________________________________________________________________________________________
        </span>
         <div className={styles.table}>
        <MDBTable bordered hover  scrollY="true" maxHeight="200" size="sm" >
        <caption>List of Course Videos(Total Videos-{this.state.videos.length})</caption>

     <MDBTableHead  textWhite>
     <tr className={styles.tablehead}>
       <th>Title</th>
       <th>Viewcount</th>
       <th>Duration</th>
     </tr>
     </MDBTableHead>
     <MDBTableBody>
     {this.displayvideolist(this.state.videos)}
     </MDBTableBody>
  </MDBTable>
  </div>
  <br/>
  <div className={styles.button}>
    <Button className={styles.plzadd}>
      <Link
        to={{
          pathname: `/admin/courses/${this.props.match.params.id}/videos`,
          state: {
            title: this.state.title,
          },
        }}
      >
        <span className={styles.font}>ADD COURSE VIDEOS</span>
      </Link>
    </Button>
  </div>
  <br />
  <br />
  <br />
      </div>
    );
  }
}

export default AdminCourseDetail;
