document.getElementById('chat-form').addEventListener('submit', async e => {
  e.preventDefault();
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  const box = document.getElementById('chat-box');
  box.innerHTML += `<div class="user">🧑‍💻: ${text}</div>`;

  const res = await fetch('chatbot.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'prompt=' + encodeURIComponent(text)
  });
  const reply = await res.text();
  box.innerHTML += `<div class="bot">🤖: ${reply}</div>`;
  box.scrollTop = box.scrollHeight;
});
