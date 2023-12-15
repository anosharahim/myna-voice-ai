import React, { useEffect, useRef, useState } from "react";
import "../css/audio-player.scss";

// TODO: duplicate code from HomePage.jsx. Should extract into shared file.
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedMinutes}:${formattedSeconds}`;
};

const AudioPlayer = ({ audio, isAudioPlaying, setIsAudioPlaying }) => {
  const ref = useRef(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");

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
      // checks audio duration progress while playing
      const updateInterval = setInterval(() => {
        setCurrentTime(formatTime(ref?.current.currentTime));
      }, 1000);
      return () => clearInterval(updateInterval);
    } else {
      ref?.current.pause();
    }
    
    // Add duration here to fix bug -- Switching audio while
    // playing another audio now correctly starts playing the new audio.
  }, [isAudioPlaying, duration]);


  return (
    <div className="audio-pop-up">
      <audio
        ref={ref}
        src={audio.url}
        style={{ display: "none" }}
        onDurationChange={(e) =>
          setDuration(Math.floor(e.currentTarget.duration))
        }
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
          <div className="start-time">{currentTime}</div>
          <div className="slider">
            <button
              className="slider-circle"
              style={{
                left: `${(ref?.current?.currentTime / duration) * 100}%`,
              }}
            ></button>
            <div className="slider-thin-line"></div>s
            {/* TODO: Thick line with how much of audio was loaded */}
            {/* <div className="slider-thick-line"></div> */}
          </div>
          <div className="end-time">{formatTime(duration)}</div>
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
