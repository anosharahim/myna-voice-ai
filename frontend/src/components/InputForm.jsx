import React, { useState } from "react";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";

function InputForm({ onLogOut }) {
  const [url, setUrl] = useState("");
  const [audio, setAudio] = useState("");

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
      {audio ? (
        <AudioPlayer audio={audio} />
      ) : (
        // {/* <audio controls src={response} ref={audioElementRef}></audio> */}
        <div> no file yet </div>
      )}
    </div>
  );
}

export default InputForm;
