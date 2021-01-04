import React, { Component, Suspense, useContext } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "video.js/dist/video-js.css";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoursePage from "./components/CoursePage/CoursePage";
import LandingPage from "./components/LandingPage/LandingPage";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import Courses from "./components/Courses/Courses";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./hoc/ProtectedRoute";
import VideoRoute from "./hoc/VideoRoute";
import spinner from "./images/spinner.gif";

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
            <Route path="/courses" exact component={Courses} />
            <Route path="/courses/:id" exact component={CourseDetail} />

            <ProtectedRoute
              exact
              path="/courses/:courseId/videos/:id"
              component={CourseVideos}
            ></ProtectedRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

/// LAZY LOADING DYNAMIC IMPORTS
// const CourseVideos = React.lazy(() =>
//   import("./components/CourseVideos/CourseVideos")
// );

{
  /* <Route
              path="/courses/:courseId/videos/:id"
              exact
              render={(props) => (
                <Suspense
                  fallback={
                    <div
                      style={{
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src={spinner} alt="" width="150px" height="150px" />
                    </div>
                  }
                >
                  <CourseVideos {...props} />
                </Suspense>
              )}
              // component={CourseVideos}
            /> */
}
