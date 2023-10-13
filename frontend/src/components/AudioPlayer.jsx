import { useEffect, useRef, useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

function AudioPlayer({ response }) {
  const audioElementRef = useRef(null);
  //   const [response, setResponse] = useState("");

  useEffect(() => {
    if (!audioElementRef.current) {
      return;
    }
    let timeout = null;
    // let isRecognitionStarted = false;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      // isRecognitionStarted = true;
    };
    recognition.onend = () => {
      console.log("Speech recognition ended, WHY?");
      // isRecognitionStarted = false;
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
      // For later: send text to backend, inject into prompt, get answer from OpenAI API, send back to frontend
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (audioElementRef.current) {
          audioElementRef.current.play();
        }
      }, 3000);
    };

    // debugger;
    if (audioElementRef.current) {
      audioElementRef.current.onplay = () => {
        // debugger;
        // if (!isRecognitionStarted) {
        recognition.start();
        // isRecognitionStarted = true; // Set the flag when recognition starts
        // }
      };
    }

    return () => {
      recognition.stop();
    };
  }, [audioElementRef.current]);
  return (
    <div>
      <audio controls src={response} ref={audioElementRef}></audio>
    </div>
  );
}

export default AudioPlayer;
