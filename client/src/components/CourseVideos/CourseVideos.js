import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import NavBar from "./NavBar/NavBar";
import styles from "./CourseVideos.module.css";
import ContentBox from "./ContentBox/ContentBox";
import Dashboard from "./Dashboard/Dashboard";
import axios from "axios";
import StreamingErrBound from "../../hoc/StreamingErrBound";

const CourseVideos = (props) => {
  const { user, details } = props.location.state;
  let currentId = 0;

  ////@start setup/retrieve last viewed ID(array index of the playlist) to/from localStorage.
  if (localStorage.getItem(`${details.id}`) === null) {
    const last_vid_details = {
      lastId: currentId,
      timeStamp: 0,
      pbRate: 1,
    };
    localStorage.setItem(`${details.id}`, JSON.stringify(last_vid_details));
  } else {
    const { lastId } = JSON.parse(localStorage.getItem(`${details.id}`));
    currentId = lastId;
  }
  ////@end

  const [videos, setVideos] = useState([]);
  const [vidPlist, setVidPlist] = useState([]);
  const [curId, setCurId] = useState(currentId);
  const [curTime, setCurTime] = useState(0);

  const timeUpdate = (e) => {
    setCurTime(e.target.currentTime);
  };

  const changeVideo = (id) => {
    setCurId(id);
    const last_vid_details = JSON.parse(localStorage.getItem(`${details.id}`));
    last_vid_details.lastId = id;
    localStorage.setItem(`${details.id}`, JSON.stringify(last_vid_details));
  };

  const goToBookmarkTime = (time) => {
    document.querySelector("video").currentTime = time;
  };

  useEffect(() => {
    ///////// @start
    ///////// THIS IS AN API CALL TO THE "/api/courses/:id" ROUTE
    const apiCall = () => {
      axios
        .get(`/api/courses/${details.id}`)
        .then((res) => {
          var videos = res.data.media;

          ///Sorting the videos
          if (videos.length !== 0 && videos[0].hasOwnProperty("index")) {
            videos.sort(function (a, b) {
              if (a.index.sectionIndex === b.index.sectionIndex) {
                return a.index.videoIndex - b.index.videoIndex;
              }
              return a.index.sectionIndex > b.index.sectionIndex ? 1 : -1;
            });
          } else {
            console.log("Manually uploaded videos");
          }
          ///

          setVideos(videos);
          const plist = videos.map((vid, i) => {
            return {
              sources: [
                { src: `${vid.filePath}`, type: "application/dash+xml" },
              ],
              poster: `${vid.thumbnail}`,
            };
          });
          setVidPlist(plist);
        })
        .catch((err) => console.log(err));
    };
    apiCall();
    ////////// @end
  }, []);

  return (
    <div id="courseVideosPage">
      <NavBar user={user} details={details} />
      <VideoPlayer
        user={user}
        details={details}
        // vidId={props.computedMatch.params.id}
        vidId={details.videos[curId]}
        plist={vidPlist}
        curId={curId}
        curTime={curTime}
        setCurTime={setCurTime}
        setCurId={setCurId}
        timeUpdate={timeUpdate}
      />
      <div className={styles.contentBox}>
        <h3 style={{ fontFamily: "myUbuntu", marginTop: "10px" }}>
          Content Box
        </h3>
        <ContentBox
          user={user}
          details={details}
          videos={videos}
          changeVideo={changeVideo}
          curId={curId}
        />
      </div>
      <div className={styles.dashboard}>
        <Dashboard
          details={details}
          user={user}
          videos={videos}
          changeVideo={changeVideo}
          curId={curId}
          curTime={curTime}
          goToBookmarkTime={goToBookmarkTime}
        />
      </div>
    </div>
  );
};

export default CourseVideos;
