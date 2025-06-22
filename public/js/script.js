document.addEventListener("DOMContentLoaded", function () {
  // === COUNTDOWN TO 1st SEPTEMBER ===
// === COUNTDOWN TO 1st SEPTEMBER ===
function updateCountdown() {
  const targetDate = new Date("2025-09-01T00:00:00");
  const now = new Date();
  const diff = targetDate - now;

  const countdownEl = document.getElementById("miniCountdown");

  if (!countdownEl) {
    console.error("Countdown element (#miniCountdown) not found in the DOM.");
    return;
  }

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

// Run immediately and every second
document.addEventListener("DOMContentLoaded", function () {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});


  // Call countdown every second
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
        "bed_kalpsizsin_asalet": `
          <strong>💔 The Heartless Queen</strong><br/>
          Cold, elegant, a slow burn. You destroy feelings with a quiet smile. You walk away like you’ve never been there — a classy ice queen who knows how to haunt.
        `,
        "smirk_netdmusic_teror": `
          <strong>⚔️ The Comeback Machine</strong><br/>
          Sarcastic, sharp, always ready with a savage comeback. Drama is your runway, and toxicity is your favorite accessory. You sting with a wink and disappear like a boss.
        `,
        "rage_netdmusic_teror": `
          <strong>🌪️ The Pure Rager</strong><br/>
          Pure chaos personified. Explosions are your love language. You don’t just break the plate — you smash the whole kitchen. Pure energy. Pure anarchy.
        `,
        "bed_iyeoka_yokluk": `
          <strong>🌙 The Melancholic Ghost</strong><br/>
          You haunt with silence. Sad, elegant, unforgettable. You don’t scream, you whisper. But when you’re gone, your absence is the storm. Forever on their mind.
        `,
        "smirk_iyeoka_teror": `
          <strong>⚡️ The Electric Phantom</strong><br/>
          Neon energy and midnight mystery. You’re here one second, gone the next. Pure electric thrill. You short-circuit the room and disappear with a wink.
        `,
        "bed_kalpsizsin_yokluk": `
          <strong>🕳️ The Quiet Void</strong><br/>
          The silence that kills. You own the space you never fill. Calm, quiet, and devastating. No words needed. Just a void where chaos used to be.
        `,
        "smirk_kalpsizsin_asalet": `
          <strong>👑 The Chaotic Aristocrat</strong><br/>
          Pure grace, sharp tongue. You cause collapse with a wink and a smirk. The type that drops a line and leaves the room like it’s a runway. Pure, classy destruction.
        `
      };
      const resultText = combos[key] || `
  <strong>🔮 Undefined Chaos</strong><br/>
  You’re an unpredictable force. No one can box your chaos.
`;


      resultEl.innerHTML = resultText;
      resultEl.classList.remove("hidden");
    });
  }
});



// =======================
// Spotify Play Buttons
// =======================
const playButtons = document.querySelectorAll('.play-button');
playButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const spotifyUri = button.getAttribute('data-spotify');
    if (spotifyUri) {
      alert(`Opening Spotify for: ${spotifyUri}`);
      window.open(`https://open.spotify.com/track/${spotifyUri.split(':')[2]}`, '_blank');
    }
  });
});
