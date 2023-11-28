import axios from "axios";
import { useEffect, useRef, useState } from "react";

function AudioJustListen({ audio }) {
  return (
    <div>
      {" "}
      <div style={{ display: "none" }}>
        <audio controls src={audio}></audio>
      </div>
    </div>
  );
}

export default AudioJustListen;
