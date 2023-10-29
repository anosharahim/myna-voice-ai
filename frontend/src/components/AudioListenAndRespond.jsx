import axios from "axios";
import { useEffect, useRef, useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false; // only gets end transcripts

function AudioListenAndRespond({ audio }) {
  const audioElementRef = useRef(null);
  const [transcript, setTranscript] = useState("");

  const sendUserMessage = async (query, e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const response = await axios.post("/message-view/", { query });
      if (response.status === 200) {
        console.log("Response from backend:", response.data);
      } else {
        console.error("Error sending query to the backend");
      }
    } catch (error) {
      console.error(error);
    }
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
      const sentenceTranscript = event.results[0][0].transcript;
      const newTranscript = transcript + sentenceTranscript; // add all transcripts together
      setTranscript(newTranscript);

      // pause audio while user is speaking
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      // wait for more user input
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        sendUserMessage(newTranscript); //send to backend if no additional input
        console.log(`Sending "${newTranscript}"`);
        if (audioElementRef.current) {
          audioElementRef.current.play();
        }
      }, 3000);
    };

    if (audioElementRef.current) {
      audioElementRef.current.onplay = () => {
        if (!isRecognitionStarted) {
          recognition.start();
          isRecognitionStarted = true;
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

export default AudioListenAndRespond;
