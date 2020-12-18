import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import axios from "axios";

const CourseVideos = (props) => {
  const { user, details } = props.location.state;

  return (
    <div>
      <VideoPlayer user={user} details={details} />
    </div>
  );
};

export default CourseVideos;
