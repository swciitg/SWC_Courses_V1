import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "../CourseVideos.module.css";
import "./VideoPlayer.css";
import videojs from "video.js";
import axios from "axios";

require("videojs-contrib-quality-levels");
require("videojs-http-source-selector");
require("videojs-playlist");

function VideoPlayer(props) {
  const {
    user,
    details,
    vidId,
    curId,
    setCurId,
    plist,
    curTime,
    setCurTime,
    timeUpdate,
  } = props;
  const playerRef = useRef();
  const currTs = 15;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    plugins: {
      httpSourceSelector: {
        default: "low",
      },
    },
    controlBar: { volumePanel: { inline: false } },
    playbackRates: [0.5, 1, 1.5, 2, 3],
    userActions: {
      hotkeys: true,
    },
  };

  useEffect(() => {
    const player = videojs(
      playerRef.current,
      videoJsOptions,
      function onPlayerReady() {
        console.log("Video.js Ready", player);
        player.playlist(plist);
        player.playlist.autoadvance(0);
        if (curId !== -1 && plist.length !== 0) {
          player.playlist.currentItem(curId);
        }

        if (plist.length === 0) {
          const { timeStamp, pbRate } = JSON.parse(
            localStorage.getItem(`${details.id}`)
          );
          player.currentTime(timeStamp);
          // player.playbackRate(pbRate);
        }

        // if (plist.length == 0) {
        //   const Button = videojs.getComponent("Button");
        //   const PrevButton = videojs.extend(Button, {
        //     constructor: function () {
        //       Button.apply(this, arguments);
        //       this.addClass("vjs-icon-previous-item");
        //       this.controlText("Previous");
        //     },
        //     handleClick: function () {
        //       console.log("click previous");
        //       player.playlist.previous();
        //       // setCurId(curId - 1);
        //       // if (curId !== 0) {
        //       //   console.log("prev state cchange");
        //       // }
        //     },
        //   });
        //   const NextButton = videojs.extend(Button, {
        //     constructor: function () {
        //       Button.apply(this, arguments);
        //       this.addClass("vjs-icon-next-item");
        //       this.controlText("Next");
        //     },
        //     handleClick: function () {
        //       console.log("click next");
        //       player.playlist.next();
        //       if (curId !== plist.length - 1) {
        //         setCurId(curId + 1);
        //       }
        //     },
        //   });
        //   videojs.registerComponent("NextButton", NextButton);
        //   videojs.registerComponent("PrevButton", PrevButton);
        //   player.getChild("controlBar").addChild("PrevButton", {}, 0);
        //   player.getChild("controlBar").addChild("NextButton", {}, 2);
        // }
      }
    );
  }, [plist, curId]);

  useEffect(() => {
    return () => {
      videojs(playerRef.current).dispose();
    };
  }, []);

  return (
    <div data-vjs-player className={styles.videoContainer}>
      <video
        ref={playerRef}
        className={classNames(
          "video-js",
          "vjs-big-play-centered",
          "vjsControls",
          styles.player
        )}
        onTimeUpdate={(e) => {
          const last_vid_details = JSON.parse(
            localStorage.getItem(`${details.id}`)
          );
          last_vid_details.timeStamp = e.target.currentTime;
          localStorage.setItem(
            `${details.id}`,
            JSON.stringify(last_vid_details)
          );
        }}
        onSeeked={timeUpdate}
        onRateChange={(e) => {
          const last_vid_details = JSON.parse(
            localStorage.getItem(`${details.id}`)
          );
          last_vid_details.pbRate = e.target.playbackRate;
          localStorage.setItem(
            `${details.id}`,
            JSON.stringify(last_vid_details)
          );
        }}
        onEnded={() => {
          if (curId === plist.length - 1) {
            setCurId(0);
            const last_vid_details = JSON.parse(
              localStorage.getItem(`${details.id}`)
            );
            last_vid_details.lastId = 0;
            localStorage.setItem(
              `${details.id}`,
              JSON.stringify(last_vid_details)
            );
          } else {
            setCurId(curId + 1);
            const last_vid_details = JSON.parse(
              localStorage.getItem(`${details.id}`)
            );
            last_vid_details.lastId = curId + 1;
            localStorage.setItem(
              `${details.id}`,
              JSON.stringify(last_vid_details)
            );
          }
        }}
      />
    </div>
  );
}

export default VideoPlayer;

//   const getSrc = () => {
//   return new Promise((resolve, reject) => {
//     /////// @start
//     ///////// THIS IS AN API CALL TO GET VIDEO
//     const apiCall = () => {
//       axios
//         .get(`/api/courses/${details.id}/video/${vidId}`)
//         .then((res) => {
//           resolve(res.data.video.filePath);
//         })
//         .catch((err) => {
//           console.log(err);
//           console.log("reject");
//           reject(err);
//         });
//     };
//     apiCall();
//     ////////// @end
//   });
// };

// getSrc()
//   .then((src) => {
//     const videoJsOptions = {
//       autoplay: false,
//       controls: true,
//       plugins: {
//         httpSourceSelector: {
//           default: "low",
//         },
//       },
//       controlBar: { volumePanel: { inline: false } },
//       playbackRates: [0.5, 1, 1.5, 2, 3],
//       userActions: {
//         hotkeys: true,
//       },
//       // sources: [
//       //   {
//       //     src: src,
//       //     type: "application/dash+xml",
//       //   },
//       // ],
//     };
//     const player = videojs(
//       playerRef.current,
//       videoJsOptions,
//       function onPlayerReady() {
//         console.log("Video.js Ready", player);
//         player.playlist(props.plist);
//         player.playlist.autoadvance(0);
//       }
//     );

//     if (curId !== -1) {
//       player.playlist.currentItem(curId);
//     }
//     // player.currentTime(ts);
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });

// useEffect(() => {
//   /////// @start
//   ///////// THIS IS AN API CALL TO UPDATE LAST VIEWED VIDEO
//   const apiCall = () => {
//     axios({
//       method: "patch",
//       url: `/api/courses/${details.id}/video/${details.videos[curId]}`,
//       data: {
//         video_id: details.videos[curId],
//       },
//       withCredentials: true,
//     })
//       .then((res) => {
//         console.log("HOl success", res.data);
//       })
//       .catch((err) => console.log(err));
//   };
//   apiCall();
//   ////////// @end
// }, [curId]);

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
