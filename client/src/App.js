import React, { Suspense } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "video.js/dist/video-js.css";
import axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import LandingPage from "./components/LandingPage/LandingPage";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import Courses from "./components/Courses/Courses";
import { AuthProvider } from "./contexts/AuthContext";
import { CoursesProvider } from "./contexts/CoursesContext";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./hoc/ProtectedRoute";
import CourseVideos from "./components/CourseVideos/CourseVideos";
import AdminCourses from "./components/AdminCourses/AdminCourses";
import AdminCourseDetail from "./components/AdminCourses/AdminCourseDetail";
import VideosUpload from "./components/AdminCourses/VideosUpload";
import TorrentUpload from "./components/AdminCourses/TorrentUpload";
import UserPanel from "./components/AdminCourses/UserPanel/UserPanel";
import My404Component from "./components/404/My404Component";

// const AdminCourses = React.lazy(() =>
//   import("./components/AdminCourses/AdminCourses")
// );
// const VideosUpload = React.lazy(() =>
//   import("./components/AdminCourses/VideosUpload")
// );
// const AdminCourseDetail = React.lazy(() =>
//   import("./components/AdminCourses/AdminCourseDetail")
// );
// const TorrentUpload = React.lazy(() =>
//   import("./components/AdminCourses/TorrentUpload")
// );
// const UserPanel = React.lazy(() =>
//   import("./components/AdminCourses/UserPanel/UserPanel")
// );
// const My404Component = React.lazy(() =>
//   import("./components/404/My404Component")
// );

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = "/courses";

const App = (props) => {
  return (
    <AuthProvider>
      <CoursesProvider>
        <UserProvider>
          <BrowserRouter>
            <div className={styles.App}>
              <Switch>
                <Route path="/courses" exact component={LandingPage} />
                <ProtectedRoute
                  exact
                  path="/courses/profile"
                  component={(props) => (
                    <ProfilePage {...props} profile={true} courses={false} />
                  )}
                ></ProtectedRoute>
                {/* <Route path="/courses/courses" exact component={Courses} /> */}
                <ProtectedRoute
                  exact
                  path="/courses/courses/"
                  component={Courses}
                ></ProtectedRoute>
                <Route
                  path="/courses/courses/:id"
                  exact
                  component={CourseDetail}
                />
                <ProtectedRoute
                  exact
                  path="/courses/courses/:courseId/videos/:id"
                  component={CourseVideos}
                ></ProtectedRoute>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                <ProtectedRoute
                  path="/courses/admin"
                  exact
                  component={AdminCourses}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/courses/admin/torrentUpload"
                  exact
                  component={TorrentUpload}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/courses/admin/userPanel"
                  exact
                  component={UserPanel}
                ></ProtectedRoute>
                <Route
                  path="/courses/admin/courses/:id/videos"
                  exact
                  component={VideosUpload}
                />
                <Route
                  path="/courses/admin/courses/:id"
                  exact
                  component={AdminCourseDetail}
                />
                <Route path="*" exact component={My404Component} />
                {/* </Suspense> */}
              </Switch>
            </div>
          </BrowserRouter>
        </UserProvider>
      </CoursesProvider>
    </AuthProvider>
  );
};

export default App;
