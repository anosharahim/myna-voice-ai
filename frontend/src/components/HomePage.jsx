import React, { useState } from "react";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";

function InputForm({ onLogOut }) {
  const [url, setUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [audioLibrary, setAudioLibrary] = useState([]);

  // Fetch the user's audio library when the component mounts
  useEffect(() => {
    async function fetchAudioLibrary() {
      try {
        const response = await axios.get("/get-audio-library"); // Replace with your backend endpoint
        setAudioLibrary(response.data);
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
      {/* Display the user's audio library */}
      <div>
        <h2>Your Audio Library</h2>
        <ul>
          {audioLibrary.map((audioItem, index) => (
            <li key={index}>
              <AudioPlayer audio={audioItem.url} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InputForm;
