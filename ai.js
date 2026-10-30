(() => {
  const AI_API_URL =
    "https://fragrant-flower-2176.vp5vy7g7db.workers.dev";

  const form = document.querySelector("#chatForm");
  const input = document.querySelector("#chatInput");
  const chat = document.querySelector("#chatBody");

  if (!form || !input || !chat) return;

  function addMessage(text, role) {
    const message = document.createElement("div");
    message.className = `bubble ${role}`;
    message.textContent = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
    return message;
  }

  let busy = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const question = input.value.trim();
    if (!question || busy) return;

    busy = true;
    const button = form.querySelector("button");
    if (button) button.disabled = true;

    addMessage(question, "user");
    input.value = "";

    const answer = addMessage("Жауап дайындалып жатыр…", "bot");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Сервер қатесі: ${response.status}`
        );
      }

      answer.textContent = data.answer || "Бос жауап келді.";
    } catch (error) {
      answer.textContent =
        error.name === "AbortError"
          ? "Жауап күту уақыты аяқталды. Қайталап көр."
          : `Қате: ${error.message}`;
    } finally {
      clearTimeout(timer);
      busy = false;
      if (button) button.disabled = false;
      chat.scrollTop = chat.scrollHeight;
    }
  });
})();
