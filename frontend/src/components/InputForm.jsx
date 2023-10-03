import React, { useState, useEffect } from "react";
import axios from "axios";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function InputForm({ onLogOut }) {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/search-view/", {
        url,
      });
      setResponse(`/${response.data.audio_url}`);
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while sending the URL.");
    }
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("logout/");
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
      {response ? (
        <audio autoPlay controls src={response}></audio>
      ) : (
        <div> no file yet </div>
      )}
    </div>
  );
}

export default InputForm;
