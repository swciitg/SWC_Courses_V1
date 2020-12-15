import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const VideoRoute = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const apiCall = () => {
        axios
          .get("/user")
          .then(({ data }) => {
            if (
              data.enrolled_courses_id.includes(
                props.computedMatch.params.courseId
              )
            ) {
              setIsEnrolled(true);
            }
          })
          .catch((err) => console.error(err));
      };
      apiCall();
    }
  }, []);

  const Component = props.component;

  return isLoggedIn && isEnrolled ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
};

export default VideoRoute;
