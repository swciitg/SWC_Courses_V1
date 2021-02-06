import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./AdminCourses.module.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Badge } from "reactstrap";
import { Button } from "reactstrap";
import axios from "axios";

class AdminCourseVideo extends Component {
  state = {
    videos : []
  };
  GetVideo = () => {
    axios
      .get(`/api/courses/${this.props.match.params.id}`)
      .then((response) => {
        const data = response.data;

        console.log(response.data);
        this.setState({
          videos: data.videos
        });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!!");
      });
  };
  displayvideolist = (videos) => {

    if (!videos.length)
      return <div className={styles.nocourse}>No Videos Found</div>;

    return videos.map((video) => (
      <tr>
  <td>{video.index}</td>
  <td>{video.title}</td>
  <td>{video.viewcount}</td>
  <td>{video.duration}</td>
</tr>
    ));
  };
  render() {
    return (
      <Table striped bordered hover size="sm">
   <thead>
   <tr>
     <th>Index</th>
     <th>Title</th>
     <th>Viewcount</th>
     <th>Duration</th>
   </tr>
   </thead>
   <tbody>
   {this.displayvideolist(this.state.videos)}
   </tbody>
</Table>
    );
  }
}

export default AdminCourseVideo;
