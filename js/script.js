// === COUNTDOWN TO 1st SEPTEMBER ===
function updateCountdown() {
  const targetDate = new Date("2025-09-01T00:00:00");
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("miniCountdown").textContent = "🛬 Arrived!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("miniCountdown").textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

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

    const key = `${answers.q1}_${answers.q2}_${answers.q3}`;

    // Placeholder result mapping
    const combos = {
      lipstick_pop_revenge: `
        <strong>💄 The Enchanted Fury</strong><br />
        <!-- Add your character's logic here --> 
      `,
      keychain_emo_chaotic: `
        <strong>🧿 The Haunted Heart</strong><br />
        <!-- Add your character's logic here -->
      `,
      earbuds_hyperpop_mystery: `
        <strong>🎧 The Electric Phantom</strong><br />
        <!-- Add your character's logic here -->
      `,
      // Add more combinations as needed...
    };

    const resultText = combos[key] || `
      <strong>🔮 Undefined Chaos</strong><br />
      You’re unclassifiable. One of one.<br />
      <!-- Optional fallback description -->
    `;

    resultEl.innerHTML = resultText;
    resultEl.classList.remove("hidden");
  });
});


function saveEntry() {
  const entry = document.getElementById("diaryEntry").value.trim();
  if (!entry) return;

  const existing = JSON.parse(localStorage.getItem("chaosEntries")) || [];
  existing.push({
    text: entry,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem("chaosEntries", JSON.stringify(existing));
  document.getElementById("diaryEntry").value = "";
  alert("Chaos recorded.");
}

function viewEntries() {
  window.location.href = "pages/diary.html"; // ✅ correct path after moving
}


