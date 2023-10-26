import React, { useState, useEffect } from "react";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";

function InputForm({ onLogOut }) {
  const [url, setUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [audioLibrary, setAudioLibrary] = useState([]);

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
      onLogOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleLogOut}> Logout</button>
      {audio ? <AudioPlayer audio={audio} /> : <div> no file yet </div>}
      <div>
        <h1>User's Audio Library</h1>
        <div>
          {audioLibrary.length > 0 ? (
            <ul>
              {audioLibrary.map((audio, index) => (
                <li key={index}>
                  <h3>{audio.title}</h3>
                  <AudioPlayer audio={audio} />
                </li>
              ))}
            </ul>
          ) : (
            <div>No audio files in the library yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputForm;
