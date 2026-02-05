import { useEffect } from "react";

export default function PhonemeResult({ data }) {
  useEffect(() => {
    if (!data) return;

    const msg = new SpeechSynthesisUtterance(
      data.score > 80
        ? "Great job! You said it correctly!"
        : `Try again. Correct pronunciation is ${data.correctPh.join(" ")}`
    );

    msg.rate = 0.9;
    msg.pitch = 1.1;
    msg.lang = "en-US";

    const t = setTimeout(() => speechSynthesis.speak(msg), 500);
    return () => clearTimeout(t);
  }, [data]);

  if (!data) return null;

  return (
    <div>
      <h3>Phoneme Feedback</h3>

      {data.comparison.map((p, i) => (
        <span
          key={i}
          style={{
            margin: 6,
            padding: 8,
            borderRadius: 6,
            background: p.match ? "#b6fcb6" : "#ffb3b3",
            fontWeight: "bold"
          }}
        >
          {p.expected}
        </span>
      ))}

      <br /><br />

      <button onClick={() => speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          data.correctPh.join(" ")
        )
      )}>
        🔊 Hear Again
      </button>

      <h2>Score: {data.score}</h2>
      <div>{"⭐".repeat(Math.floor(data.score / 20))}</div>
    </div>
  );
}
