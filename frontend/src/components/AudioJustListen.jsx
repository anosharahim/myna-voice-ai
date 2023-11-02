import axios from "axios";
import { useEffect, useRef, useState } from "react";

function AudioJustListen({ audio }) {
  return (
    <div>
      {" "}
      <div>
        <audio controls src={audio}></audio>
      </div>
    </div>
  );
}

export default AudioJustListen;
