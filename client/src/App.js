import React, { Component } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoursePage from "./components/CoursePage/CoursePage";
import LandingPage from "./components/LandingPage/LandingPage";
import CourseDetail from "./components/CourseDetail/CourseDetail";

axios.defaults.headers.post["Content-Type"] = "application/json";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route
            path="/profile"
            exact
            component={(props) => (
              <CoursePage {...props} profile={true} courses={false} />
            )}
          />
          <Route
            path="/courses"
            exact
            component={(props) => (
              <CoursePage {...props} profile={false} courses={true} />
            )}
          />
          <Route path="/courses/:id" exact component={CourseDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
