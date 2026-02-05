export async function sendAudio(word, blob) {
  const form = new FormData();
  form.append("audio", blob);

  const res = await fetch(`https://pronunciation-engine-backend-1.onrender.com/api/pronounce/${word}
`, {
    method: "POST",
    body: form
  });

  return await res.json();
}
