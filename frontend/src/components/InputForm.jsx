import React, { useState } from "react";
import axios from "axios";

function InputForm(onLogOut) {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/search-view/", {
        url,
      });
      setResponse(`http://127.0.0.1:8000/${response.data.audio_url}`);
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
