// === COUNTDOWN TO 1st SEPTEMBER ===
function updateCountdown() {
  const target = new Date("2025-09-01T00:00:00");
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("miniCountdown").textContent = "LANDED!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  document.getElementById("miniCountdown").textContent =
    `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// === CHAOS PERSONALITY QUIZ ===
document.addEventListener("DOMContentLoaded", function () {
  const quizForm = document.getElementById("chaosQuiz");
  const resultEl = document.getElementById("quizResult");

  if (!quizForm) return;

  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const answers = {
      q1: document.querySelector('input[name="q1"]:checked')?.value,
      q2: document.querySelector('input[name="q2"]:checked')?.value,
      q3: document.querySelector('input[name="q3"]:checked')?.value,
    };

    if (!answers.q1 || !answers.q2 || !answers.q3) {
      resultEl.innerHTML = "⚠️ Please answer all questions.";
      resultEl.classList.remove("hidden");
      return;
    }

    const combos = {
      shadow_metal_cold: `
        <strong>The Shadow Operator</strong><br />
        You move quietly and strike with precision. Chaos for you is all about stealth and control.<br />
        <em>You’d rather pull strings behind the curtain than be in the spotlight.</em>
      `,
      mirror_trance_heat: `
        <strong>The Fire Glitch</strong><br />
        You thrive on unpredictable energy and live for drama. Mirrors? Just portals to your next meltdown.<br />
        <em>You are magnetic, chaotic, and unforgettable.</em>
      `,
      spark_lofi_static: `
        <strong>The Neon Drifter</strong><br />
        Your chaos is subtle, dreamy, and electric. You float between vibes, soundtracked by lo-fi beats.<br />
        <em>You look chill, but you're broadcasting static at full volume.</em>
      `,
    };

    const key = `${answers.q1}_${answers.q2}_${answers.q3}`;
    const personality = combos[key] || `
      <strong>The Undefined Chaos</strong><br />
      You defy all categories. Pure unpredictability.<br />
      <em>You're a walking paradox — and proud of it.</em>
    `;

    resultEl.innerHTML = personality;
    resultEl.classList.remove("hidden");

    // Optional: Save to localStorage (uncomment if needed)
    // localStorage.setItem("chaosPersonality", personality);
  });

  // Optional: Load saved result
  // const savedResult = localStorage.getItem("chaosPersonality");
  // if (savedResult) {
  //   resultEl.innerHTML = savedResult;
  //   resultEl.classList.remove("hidden");
  // }
});
