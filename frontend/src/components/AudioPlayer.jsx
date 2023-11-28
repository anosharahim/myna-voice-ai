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
    </div>
  );
};

export default AudioPlayer;
