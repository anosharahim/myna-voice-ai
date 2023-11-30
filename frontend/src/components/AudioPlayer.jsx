import React, { useEffect, useRef, useState } from "react";
import "../css/audio-player.scss";

const AudioPlayer = ({ audio, isAudioPlaying, setIsAudioPlaying }) => {
  const ref = useRef(null);

  // states
  const [duration, setDuration] = React.useState(0);

  const togglePlay = () => {
    if (isAudioPlaying) {
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
    }
  };

  useEffect(() => {
    if (isAudioPlaying) {
      ref?.current.play();
    } else {
      ref?.current.pause();
    }
  }, [isAudioPlaying]);

  // When you click on item 1, audio is that of 1
  // when you click on item 2, audio 1 needs to be paused, and audio 2 needs to be played

  return (
    <div className="audio-pop-up">
      <audio
        ref={ref}
        src={audio.url}
        style={{ display: "none" }}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        // onPlaying={() => setIsAudioPlaying(true)}
        // onPause={() => setIsAudioPlaying(false)}
      />
      {/* 1. When ref changes, get the duration and set it to component state */}
      {/* 2. Similarly for progress / start time */}
      {/* 3. Clicking on play/pause should play/pause on the audio ref */}
      {/* 4. Copy effect code from AudioListenAndRespond to this file */}
      <div className="curr-audio-title">1. {audio.title}</div>
      <div className="audio-center-controls">
        <div className="play-controls">
          <button className="rewind-button"></button>
          <button
            className={isAudioPlaying ? "pause-button" : "play-button"}
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
