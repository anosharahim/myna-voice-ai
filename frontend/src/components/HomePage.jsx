import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AudioListenAndRespond from "./AudioListenAndRespond";
import AudioJustListen from "./AudioJustListen";
import Header from "./Header";
import "../css/library.css";

function HomePage({}) {
  const [url, setUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [audioLibrary, setAudioLibrary] = useState([]);
  const [audioMessage, setAudioMessage] = useState("");
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

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/logout/");
      // TODO check response status
      navigate("/landing");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {" "}
      <Header />
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
          {audio && (
            <div>
              <AudioJustListen audio={audio} />
            </div>
          )}
          {!audio && (
            <div>
              <button onClick={handleSubmit}>Generate Audio</button>
            </div>
          )}
          {audioMessage && <div>{audioMessage}</div>}
        </div>

        <div className="library-container">
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
                  onClick={() => console.log("Clicked on item", index)}
                />
              ))
            ) : (
              <div>No audio files in the library yet.</div>
            )}
          </div>
          <button onClick={handleLogOut}> Logout</button>
        </div>
      </div>
    </div>
  );
}

function LibraryItem({ index, title, url, onClick }) {
  // TODO: Use react ref to get audio element
  const audioRef = useRef(null);
  const [totalDuration, setTotalDuration] = useState("00:00");
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
    <div className="library-item" onClick={onClick}>
      <div
        style={{
          width: "100px",
          fontWeight: "300",
          fontSize: "10",
          paddingLeft: "15px",
        }}
      >
        {index + 1}.
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
