export async function sendAudio(word, blob) {
  const form = new FormData();
  form.append("audio", blob);

  const res = await fetch(`http://127.0.0.1:5000/api/pronounce/${word}
`, {
    method: "POST",
    body: form
  });

  return await res.json();
}
