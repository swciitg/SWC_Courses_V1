import React, { Component } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "video.js/dist/video-js.css";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoursePage from "./components/CoursePage/CoursePage";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminCourses from "./components/AdminCourses/AdminCourses";
import AdminCourseDetail from "./components/AdminCourses/AdminCourseDetail";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import Courses from "./components/Courses/Courses";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./hoc/ProtectedRoute";
import VideoRoute from "./hoc/VideoRoute";
import CourseVideos from "./components/CourseVideos/CourseVideos";

axios.defaults.headers.post["Content-Type"] = "application/json";

const App = (props) => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={styles.App}>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <ProtectedRoute
              exact
              path="/profile"
              component={(props) => (
                <CoursePage {...props} profile={true} courses={false} />
              )}
            ></ProtectedRoute>
            <Route
              path="/courses"
              exact
              // component={(props) => (
              //   <CoursePage {...props} profile={false} courses={true} />
              // )}
              component={Courses}
            />
            <Route path="/courses/:id" exact component={CourseDetail} />
            <Route path="/api/admin/courses" exact component={AdminCourses} />
            <Route path="/api/admin/courses/:id" exact component={AdminCourseDetail} />
            <Route
              path="/courses/:courseId/videos/:id"
              exact
              component={CourseVideos}
            />
            {/* <VideoRoute
              exact
              path="/courses/:courseId/videos/:id"
              component={CourseVideos}
            ></VideoRoute> */}
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
