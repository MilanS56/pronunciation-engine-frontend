import { useState, useEffect } from "react";
import Recorder from "./Recorder";
import PhonemeResult from "./PhonemeResult";

export default function App() {
  const words = ["Hello","a","b","c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  const [index, setIndex] = useState(0);
  const [data, setData] = useState(null);
  const [streak, setStreak] = useState(0);

  const word = words[index];

  const handle = result => {
    setData(result);
    if (result.score > 80) setStreak(s => s + 1);
    else setStreak(0);
  };

  useEffect(() => {
    if (data?.score > 80) {
      const t = setTimeout(() => {
        setIndex(i => (i + 1) % words.length); // loop words
        setData(null); // reset UI for next word
      }, 1500);

      return () => clearTimeout(t);
    }
  }, [data]);

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h1>Say the word:</h1>
      <h2>{word}</h2>

      <Recorder word={word} onResult={handle} />

      {data && <PhonemeResult data={data} />}

      <h3>Confidence: {streak}</h3>
    </div>
  );
}
