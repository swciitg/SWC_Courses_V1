import React, { Component } from "react";
import styles from "./HomeScreen.module.css";
// ${styles.HomeScreen}
class HomeScreen extends Component {
  render() {
    return (
      <div
        id="content"
        className={`container-fluid mb-5 pb-4 d-flex align-items-center px-4 pl-md-5 ${styles.content}`}
      >
        <div className="row">
          <div className={`col-12 col-md-7 col-lg-6 px-5 ${styles.introBlock}`}>
            <p
              id="introPara"
              className={`text-center text-sm-left ${styles.introPara}`}
            >
              A simple and sweet learning platform, build for the campus. Access
              to various premium online courses and learning material covering
              skills from basic to advanced. Collaborate with peers and experts.
            </p>
            <input
              type="text"
              className={`mb-5 ${styles.hscrInput}`}
              name="dsearch"
              placeholder="Find courses ..."
            />
            {/* <div className="container-fluid pl-2 md-5 text-center text-sm-left">
              <h4>Top Grossing</h4>
              <div id="linkWrapper" className="d-flex flex-column">
                <a href="/">Javascript</a>
                <a href="/">CSS</a>
                <a href="/">Machine Learning</a>
                <a href="/">Django</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
