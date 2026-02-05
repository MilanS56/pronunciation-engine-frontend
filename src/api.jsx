export async function sendAudio(word, blob) {
  const form = new FormData();
  form.append("audio", blob);

  const res = await fetch(`http://https://pronunciation-engine-backend.onrender.com/api/pronounce/${word}
`, {
    method: "POST",
    body: form
  });

  return await res.json();
}
