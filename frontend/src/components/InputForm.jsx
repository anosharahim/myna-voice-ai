import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

function InputForm({ onLogOut }) {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const audioElementRef = useRef(null);

  // Start listening when component gets rendered, and never stop unless component gets removed from page
  useEffect(() => {
    let timeout = null;

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };
    recognition.onend = () => {
      console.log("Speech recognition ended, WHY?");
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log(transcript);
      // Use the audioElementRef to pause the audio
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      // For later: send text to backend, inject into prompt, get anser from OpenAI API, send back to frontend
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (audioElementRef.current) {
          audioElementRef.current.play();
        }
      }, 3000);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const handleStart = () => {
    recognition.start();
  };

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
      <button onClick={handleStart}>Start Listening</button>
      {response ? (
        <audio autoPlay controls src={response} ref={audioElementRef}></audio>
      ) : (
        <div> no file yet </div>
      )}
    </div>
  );
}

export default InputForm;
