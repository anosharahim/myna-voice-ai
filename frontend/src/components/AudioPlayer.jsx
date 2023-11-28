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
      <div className="curr-audio-title">1. This is an audio title</div>
      <div className="audio-center-controls">
        <div className="play-controls">
          <button className="rewind-button"></button>
          <button
            className={isPlaying ? "pause-button" : "play-button"}
            onClick={togglePlay}
          ></button>
          <button className="fastforward-button"></button>
        </div>
        <div className="slider-with-time">
          <div className="start-time">00.00</div>
          <div className="slider">
            <button className="slider-circle"></button>
            <div className="slider-thin-line"></div>
            <div className="slider-thick-line"></div>
          </div>
          <div className="end-time">00.00</div>
        </div>
      </div>
      <div className="volume">
        <button className="volume-button"></button>
        <div className="volume-slider">
          <div className="volume-thin-line"></div>
          <div className="volume-thick-line"></div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
