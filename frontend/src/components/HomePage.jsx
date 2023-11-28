import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AudioListenAndRespond from "./AudioListenAndRespond";
import AudioJustListen from "./AudioJustListen";

function HomePage({}) {
  const [url, setUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [audioLibrary, setAudioLibrary] = useState([]);
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
    try {
      const response = await axios.post("/search-view/", {
        url,
      });
      setAudio(`/${response.data.audio_url}`);
    } catch (error) {
      console.error(error);
      setAudio("Error occurred while sending the URL.");
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
    <div className="home-container">
      <div className="top-center-container">
        <form onSubmit={handleSubmit}>
          <input
            className="url-input"
            type="text"
            placeholder="Add link to a blogpost."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {/* <button type="submit">Generate URL</button> */}
        </form>
        {audio ? (
          <AudioJustListen audio={audio} />
        ) : (
          <div>
            {" "}
            <button onClick={handleSubmit}> Generate Audio</button>
          </div>
        )}
      </div>

      <div className="library-container">
        <div className="library-title">Your Library </div>
        <div>
          {audioLibrary.length > 0 ? (
            <ul>
              {audioLibrary.map((audio, index) => (
                <li key={index}>
                  <div className="audio-title">{audio.title}</div>
                  <AudioJustListen audio={audio.url} />
                </li>
              ))}
            </ul>
          ) : (
            <div>No audio files in the library yet.</div>
          )}
        </div>
        <button onClick={handleLogOut}> Logout</button>
      </div>
    </div>
  );
}

export default HomePage;
