import React, { useEffect, useState } from "react";
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
import { UserContext } from "./contexts/UserContext";
import { CoursesProvider } from "./contexts/CoursesContext";
import ProtectedRoute from "./hoc/ProtectedRoute";
import AdminRoute from "./hoc/AdminRoute";
import AdminCourses from "./components/AdminCourses/AdminCourses";
import AdminCourseDetail from "./components/AdminCourses/AdminCourseDetail";
import VideosUpload from "./components/AdminCourses/VideosUpload";
import spinner from "./images/spinner.gif";
import CourseVideos from "./components/CourseVideos/CourseVideos";
import TorrentUpload from "./components/AdminCourses/TorrentUpload";
import StreamingErrBound from "./hoc/StreamingErrBound";

axios.defaults.headers.post["Content-Type"] = "application/json";

const App = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    ///////// @start
    ///////// THIS IS AN API CALL TO THE "/user" ROUTE
    const apiCall = () => {
      axios
        .get("/user")
        .then((res) => {
          //   console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    };
    apiCall();
    ////////// @end
  }, []);

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

{
  /* <AdminRoute
              path="/admin/courses"
              exact
              component={AdminCourses}
            ></AdminRoute> */
}

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
