import { useRef, useState } from "react";
import { sendAudio } from "./api";

export default function Recorder({ word, onResult }) {
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const start = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorderRef.current = new MediaRecorder(streamRef.current);

    recorderRef.current.ondataavailable = e => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/wav" });
      chunksRef.current = [];

      console.log("Sending audio...");
      const res = await sendAudio(word, blob);
      onResult(res);
    };

    recorderRef.current.start();
    setRecording(true);
  };

  const stop = () => {
    recorderRef.current.requestData(); // force data flush
    recorderRef.current.stop();
    streamRef.current.getTracks().forEach(t => t.stop());
    setRecording(false);
  };

  return (
    <button onClick={recording ? stop : start} style={{padding:"10px 20px",fontSize:"20px",borderRadius:"10px",cursor:"pointer", backgroundColor:recording?"#ff6b6b":"#4caf50",color:"white",border:"none"}}>
      {recording ? "Stop" : "Speak"}
    </button>
  );
}
