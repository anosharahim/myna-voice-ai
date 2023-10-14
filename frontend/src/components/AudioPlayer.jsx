import axios from "axios";
import { useEffect, useRef, useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false; // only gets end result

function AudioPlayer({ audio }) {
  const audioElementRef = useRef(null);

  useEffect(() => {
    sendUserMessage();
  }, [transcript]);

  const sendUserMessage = async (transcript, e) => {
    // send transcript to backend
    e.preventDefault();
    try {
      const response = await axios.post("backend/endpoint", { transcript });
      if (response.status === 200) {
        console.log("Response from backend:", response.data);
      } else {
        console.error("Error sending transcript to the backend");
      }
    } catch (error) {
      console.error(error);
    }
    // return "response from backend? ";
  };

  useEffect(() => {
    if (!audioElementRef.current) {
      return;
    }
    let timeout = null;
    let isRecognitionStarted = false;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      isRecognitionStarted = true;
    };
    recognition.onend = () => {
      console.log("Speech recognition ended, WHY?");
      isRecognitionStarted = false;
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
      // Send to backend once user stops speaking, and get response from API
      // if user continues speaking, add it to the transcript
      // Recieve response in the frontend

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (audioElementRef.current) {
          audioElementRef.current.play();
        }
      }, 3000);
    };

    if (audioElementRef.current) {
      audioElementRef.current.onplay = () => {
        if (!isRecognitionStarted) {
          recognition.start();
          isRecognitionStarted = true; // Set the flag when recognition starts
        }
      };
    }

    return () => {
      recognition.stop();
    };
  }, [audioElementRef.current]);

  return (
    <div>
      <audio controls src={audio} ref={audioElementRef}></audio>
    </div>
  );
}

export default AudioPlayer;
