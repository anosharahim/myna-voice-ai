import React, { useEffect, useState } from "react";
import "../css/audio-player.scss";

const AudioPlayer = () => {
  const [isPlaying, setPlaying] = useState(false);

  const togglePlay = () => {
    setPlaying(!isPlaying);
    // Add logic to handle play/pause actions
  };

  return (
    <div className="audio-pop-up">
      <div className="play-controls">
        <button className="rewind-button"></button>
        <button
          className={isPlaying ? "pause-button" : "play-button"}
          onClick={togglePlay}
        ></button>
        <button className="fastforward-button"></button>
      </div>
    </div>
  );
};

export default AudioPlayer;
