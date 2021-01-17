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

  // console.log("CourseVideos RENDERED");
  // console.log("Local storage", currentId);

  const timeUpdate = (e) => {
    // console.log(e.target.currentTime);
    setCurTime(e.target.currentTime);
  };

  const changeVideo = (id) => {
    setCurId(id);
    const last_vid_details = JSON.parse(localStorage.getItem(`${details.id}`));
    last_vid_details.lastId = id;
    localStorage.setItem(`${details.id}`, JSON.stringify(last_vid_details));
  };

  const goToBookmarkTime = (time) => {
    console.log("Time from the bookmark", time);
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

          // console.log("Media object", videos);
          setVideos(videos);
          const plist = videos.map((vid, i) => {
            return {
              sources: [
                { src: `${vid.filePath}`, type: "application/dash+xml" },
              ],
              poster: `${vid.thumbnail}`,
            };
          });
          // console.log("playlist", plist);
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

// import { Link, useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import classNames from "classnames";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import Checkbox from "@material-ui/core/Checkbox";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// const classes = useStyles();
// const [checked, setChecked] = React.useState([0]);

//  const handleToggle = (value) => () => {
//    const currentIndex = checked.indexOf(value);
//    const newChecked = [...checked];
//    if (currentIndex === -1) {
//      newChecked.push(value);
//    } else {
//      newChecked.splice(currentIndex, 1);
//    }
//    setChecked(newChecked);
//  };

{
  /* <List className={classNames(classes.root)}>
          {videos.map((video, i) => {
            const labelId = `checkbox-list-label-${i}`;
            return (
              <ListItem key={i} role={undefined} dense button>
                <ListItemIcon onClick={handleToggle(i)}>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(video) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <Link
                  to={{
                    pathname: `/courses/${details.id}/videos/${video._id}`,
                    state: {
                      details: details,
                      vidId: video._id,
                      user: user,
                    },
                  }}
                  onClick={() => {
                    window.open(
                      `http://localhost:3000/courses/${details.id}/videos/${video._id}`,
                      "_self"
                    );
                  }}
                  style={{ textDecoration: "none" }}
                >
                  {video.title}
                </Link>
              </ListItem>
            );
          })}
        </List> */
}
