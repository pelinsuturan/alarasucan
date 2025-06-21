document.addEventListener("DOMContentLoaded", function () {
  // === COUNTDOWN ===
  function updateCountdown() {
    const targetDate = new Date("2025-09-01T00:00:00");
    const now = new Date();
    const diff = targetDate - now;

    const countdownEl = document.getElementById("miniCountdown");
    if (!countdownEl) return;

    if (diff <= 0) {
      countdownEl.textContent = "🛬 Arrived!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // === DIARY FORM ===
  const chaosForm = document.getElementById("chaosForm");
  const viewBtn = document.getElementById("viewEntriesBtn");

  if (chaosForm) {
    chaosForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const text = document.getElementById("chaosInput").value.trim();

      if (!text) {
        alert("You can't send empty chaos!");
        return;
      }

      fetch("/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            window.location.href = "/pages/diary.html";
          } else {
            alert("Something went wrong saving your chaos.");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Server error. Try again.");
        });
    });
  }

  if (viewBtn) {
    viewBtn.addEventListener("click", function () {
      window.location.href = "/pages/diary.html";
    });
  }

  // === QUIZ LOGIC ===
  const quizForm = document.getElementById("chaosQuiz");
  const resultEl = document.getElementById("quizResult");

  if (quizForm) {
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

      const combos = {
        lipstick_pop_revenge: `
          <strong>💄 The Enchanted Fury</strong><br />
          You thrive in chaos with elegance. Your revenge is painted in glitter.
        `,
        keychain_emo_chaotic: `
          <strong>🧿 The Haunted Heart</strong><br />
          Emotionally explosive. You’re the storm after silence.
        `,
        earbuds_hyperpop_mystery: `
          <strong>🎧 The Electric Phantom</strong><br />
          A neon-drenched enigma. Your chaos pulses in bass drops.
        `,
        // Add more combos as needed
      };

      const resultText = combos[key] || `
        <strong>🔮 Undefined Chaos</strong><br />
        You’re unclassifiable. One of one.
      `;

      resultEl.innerHTML = resultText;
      resultEl.classList.remove("hidden");
    });
  }
});
