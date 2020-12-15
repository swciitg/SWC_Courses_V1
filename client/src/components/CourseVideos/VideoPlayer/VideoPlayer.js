import React, { useEffect, useRef } from "react";
import videojs from "video.js";

function VideoPlayer(props) {
  const playerRef = useRef();

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        // src: "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd",
        src: "/mpd/trial-1607835856433/dash.mpd",
        type: "application/dash+xml",
      },
    ],
  };

  useEffect(() => {
    const player = videojs(
      playerRef.current,
      videoJsOptions,
      function onPlayerReady() {
        console.log("Video.js Ready", player);
      }
    );

    return () => {
      player.dispose();
    };
  });

  return (
    <div data-vjs-player>
      <video ref={playerRef} className="video-js" playsInline />
    </div>
  );
}

export default VideoPlayer;
