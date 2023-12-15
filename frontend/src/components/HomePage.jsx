import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";
import Header from "./Header";
import "../css/library.css";

function HomePage({}) {
  const [url, setUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [audioLibrary, setAudioLibrary] = useState([]);
  const [audioMessage, setAudioMessage] = useState("");
  const [audioVisibleInPlayer, setAudioVisibleInPlayer] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const navigate = useNavigate();

  //Fetch the user's audio library when the component mounts
  useEffect(() => {
    async function fetchAudioLibrary() {
      try {
        const response = await axios.get("/get-audio-library");
        setAudioLibrary(response.data.audio_library_data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAudioLibrary();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (url.trim() === "") {
      setAudioMessage("Please enter a valid URL.");
      setTimeout(() => setAudioMessage(""), 5000);
      return;
    }
    try {
      const response = await axios.post("/search-view/", {
        url,
      });
      setAudio(`/${response.data.audio_url}`);
      if (audio) {
        setAudioMessage("");
      } else {
        setAudioMessage("Failed to generate audio.");
      }
    } catch (error) {
      console.error(error);
      setAudio("Error occurred while sending the URL.");
      setAudioMessage("Error ocurred");
    }
  };


  return (
    <div>
      <Header onHomePage={true}/>
      <div className="home-container">
        <div className="top-center-container">
          <div className="home-title"> Start Listening Now </div>
          <form onSubmit={handleSubmit}>
            <input
              className="url-input"
              type="text"
              placeholder="Add link to a blogpost."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </form>
          {!audio && (
            <div>
              <button onClick={handleSubmit} className="global-button">
                Generate Audio
              </button>
            </div>
          )}
          {audioMessage && <div>{audioMessage}</div>}
        </div>

        <div className="library-container" style={{ display: audioLibrary.length > 0 ? "block" : "none" }}>
          <div className="library-title">Your Library </div>
          <div className="table-container">
            <div className="table-head">
              <div
                className="column-name"
                style={{ width: "100px", paddingLeft: "15px" }}
              >
                #
              </div>
              <div className="column-name" style={{ width: "700px" }}>
                Title{" "}
              </div>
              <div className="column-name"> Duration</div>
            </div>
            <div className="horizontal-line"></div>
          </div>
          <div className="library-items">
            {audioLibrary.length > 0 ? (
              audioLibrary.map((audio, index) => (
                <LibraryItem
                  key={audio.url}
                  index={index}
                  title={audio.title}
                  url={audio.url}
                  isPlaying={audio === audioVisibleInPlayer && isAudioPlaying}
                  onClick={() => {
                    if (audio === audioVisibleInPlayer && isAudioPlaying) {
                      setIsAudioPlaying(false);
                    } else {
                      setAudioVisibleInPlayer(audio);
                      setIsAudioPlaying(true);
                    }
                  }}
                />
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {audioVisibleInPlayer && (
          <AudioPlayer
            audio={audioVisibleInPlayer}
            isAudioPlaying={isAudioPlaying}
            setIsAudioPlaying={setIsAudioPlaying}
          />
        )}
      </div>
    </div>
  );
}

function LibraryItem({ index, title, url, onClick, isPlaying }) {
  const audioRef = useRef(null);
  const [totalDuration, setTotalDuration] = useState("00:00");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        const durationInSeconds = audioRef.current.duration;
        setTotalDuration(formatTime(durationInSeconds));
      });
    }
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div
      className="library-item"
      onClick={onClick}
      onMouseEnter={() => handleHover(index)}
      onMouseLeave={handleMouseLeave}
    >
      <div key={index} className="lib-item">
        <div className="lib-item-index">
          {hoveredIndex === index ? (
            isPlaying ? (
              <div className="pause-button"></div>
            ) : (
              <div className="play-icon"></div>
            )
          ) : (
            <div className="lib-index">{index + 1}.</div>
          )}
        </div>
      </div>

      <div
        className="audio-title"
        style={{ width: "700px", fontWeight: "600" }}
      >
        {title}
      </div>
      <div style={{ fontWeight: "300", fontSize: "8" }}>{totalDuration}</div>
      <div style={{ display: "none" }}>
        <audio ref={audioRef} src={url} />
      </div>
    </div>
  );
}

export default HomePage;
