import React, { useState } from "react";
import axios from "axios";

function InputForm() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/search-view/", {
        url,
      });
      setResponse(`Entered URL: ${response.data.url}`);
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while sending the URL.");
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
      <p>{response}</p>
    </div>
  );
}

export default InputForm;
