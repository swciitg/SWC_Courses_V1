import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import axios from "axios";

require("videojs-contrib-quality-levels");
require("videojs-http-source-selector");

function VideoPlayer(props) {
  const { user, details } = props;
  const playerRef = useRef();
  const ts = 2;

  const getSrc = () => {
    return new Promise((resolve, reject) => {
      /////// @start
      ///////// THIS IS AN API CALL TO GET VIDEO
      const apiCall = () => {
        axios
          .get(`/api/courses/${details.id}/video/${details.videos[0]}`)
          .then((res) => {
            resolve(res.data.video.filePath);
          })
          .catch((err) => {
            console.log(err);
            console.log("reject");
            reject(err);
          });
      };
      apiCall();
      ////////// @end
    });
  };

  getSrc()
    .then((src) => {
      const videoJsOptions = {
        autoplay: true,
        controls: true,
        plugins: {
          httpSourceSelector: {
            default: "low",
          },
        },
        sources: [
          {
            src: src,
            type: "application/dash+xml",
          },
        ],
      };
      const player = videojs(
        playerRef.current,
        videoJsOptions,
        function onPlayerReady() {
          console.log("Video.js Ready", player);
        }
      );
      player.currentTime(ts);
    })
    .catch((err) => {
      console.log("error", err);
    });

  useEffect(() => {
    console.log(user.enrolled_courses, details);
    console.log("Page loaded");
    return () => {
      videojs(playerRef.current).dispose();
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={playerRef} className="video-js" />
    </div>
  );
}

export default VideoPlayer;

// const src = "/mpd/trial-1607835856433/dash.mpd";

// console.log("videosrc", videosrc);

// const videoJsOptions = {
//   autoplay: true,
//   controls: true,
//   sources: [
//     {
//       // src: "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd",
//       src: videosrc,
//       type: "application/dash+xml",
//     },
//   ],
// };

// useEffect(() => {
//   const player = videojs(
//     playerRef.current,
//     videoJsOptions,
//     function onPlayerReady() {
//       console.log("Video.js Ready", player);
//     }
//   );
//   player.currentTime(ts);

//   return () => {
//     player.dispose();
//   };
// }, []);

// useEffect(() => {
//   ///////// @start
//   ///////// THIS IS AN API CALL TO GET VIDEO
//   const apiCall = () => {
//     axios
//       .get(`/api/courses/${details.id}/video/${details.videos[0]}`)
//       .then((res) => {
//         // console.log(res.data);
//         setVideoSrc(res.data.video.filePath);
//       })
//       .catch((err) => console.log(err));
//   };
//   apiCall();
//   ////////// @end
// }, []);
