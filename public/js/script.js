// ===========================
// Countdown Logic
// ===========================
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

// ===========================
// MAIN INIT
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  // Start Countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===========================
  // DIARY FORM
  // ===========================
  const chaosForm = document.getElementById("chaosForm");
  const viewBtn = document.getElementById("viewEntriesBtn");

  if (chaosForm) {
    chaosForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const text = document.getElementById("chaosInput").value.trim();
      const alias = document.getElementById("aliasInput")?.value.trim() || "anon";
  
      if (!text) {
        alert("You can't send empty chaos!");
        return;
      }
  
      fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, alias }),

      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`POST request failed with status ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            const chaosForm = document.getElementById("chaosForm");
            const notification = document.createElement('div');
            notification.textContent = 'Chaos saved! 🖤';
            notification.style.cssText = `
              position: absolute;
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
              background-color: #bb33ff;
              color: white;
              padding: 10px 20px;
              border-radius: 8px;
              font-weight: bold;
              z-index: 100;
              opacity: 1;
              transition: opacity 0.5s;
            `;
            chaosForm.appendChild(notification);
        
            document.getElementById("chaosInput").value = "";
            document.getElementById("aliasInput").value = "";
        
            setTimeout(() => {
              notification.style.opacity = '0';
              setTimeout(() => notification.remove(), 500);
            }, 3000);
        
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
        // bed + kalpsizsin
        "bed_kalpsizsin_asalet": `
          <strong>👑 The Ice Queen</strong><br/>
          Calm, elegant, and calculated. You destroy feelings with precision and walk away like a sculpture — timeless and cold.
        `,
        "bed_kalpsizsin_teror": `
          <strong>❄️ The Frigid Storm</strong><br/>
          You haunt with silence and suffocation. Pure terror masked as tranquility. You walk away knowing no one can forget the chill you left.
        `,
        "bed_kalpsizsin_yokluk": `
          <strong>🌊 The Quiet Abyss</strong><br/>
          You disappear like mist over water. Graceful, serene, and absolutely haunting. The silence you leave is the sound of heartbreak.
        `,
      
        // bed + netdmusic
        "bed_netdmusic_asalet": `
          <strong>⚔️ The Calm Avenger</strong><br/>
          You have the patience to wait for the right moment. You sting when no one’s looking, and it burns long after.
        `,
        "bed_netdmusic_teror": `
          <strong>🔥 The Rage In Silk</strong><br/>
          Pure emotion wrapped in a veil of grace. You explode when least expected, making every scene an unforgettable climax.
        `,
        "bed_netdmusic_yokluk": `
          <strong>🌪️ The Disappeared Wound</strong><br/>
          You leave like a ghost, and the silence you leave burns louder than words. The damage you cause lingers forever.
        `,
      
        // bed + iyeoka
        "bed_iyeoka_asalet": `
          <strong>🌙 The Melancholic Monarch</strong><br/>
          Pure poise. You haunt memories like a timeless melody. No one forgets your silence.
        `,
        "bed_iyeoka_teror": `
          <strong>☠️ The Terrifying Muse</strong><br/>
          You haunt thoughts like a lyric. Pure terror masked in beauty, making every heartbreak feel like doom.
        `,
        "bed_iyeoka_yokluk": `
          <strong>👻 The Ghost of Elegance</strong><br/>
          You disappear like mist and linger like a whisper. Pure poetry, pure heartbreak.
        `,
      
        // smirk + kalpsizsin
        "smirk_kalpsizsin_asalet": `
          <strong>👑 The Chaotic Aristocrat</strong><br/>
          Pure grace, sharp tongue. You cause collapse with a wink and leave like it's a runway. Pure, classy destruction.
        `,
        "smirk_kalpsizsin_teror": `
          <strong>☄️ The Electric Menace</strong><br/>
          You swoop in, drop a line, and watch everything burn. Pure terror in the guise of a smile.
        `,
        "smirk_kalpsizsin_yokluk": `
          <strong>🌫️ The Disappearing Trick</strong><br/>
          You leave as soon as you arrive, and the void you create is felt for years. Pure ghost.
        `,
      
        // smirk + netdmusic
        "smirk_netdmusic_asalet": `
          <strong>💃 The Drama Queen</strong><br/>
          Pure flair. Pure show. Pure dominance. You kill with a wink and walk away like it's all a scene.
        `,
        "smirk_netdmusic_teror": `
          <strong>⚡️ The Comeback Machine</strong><br/>
          Pure sting, sharp as lightning. You appear out of nowhere, drop a line, and disappear like a storm.
        `,
        "smirk_netdmusic_yokluk": `
          <strong>🌊 The Wave of Silence</strong><br/>
          You rise like a wave, destroy, and vanish like mist. Pure devastation disguised as beauty.
        `,
      
        // smirk + iyeoka
        "smirk_iyeoka_asalet": `
          <strong>🌙 The Elusive Siren</strong><br/>
          Pure allure. Pure mystery. Pure heartbreak. You draw them in like the tide and disappear like mist.
        `,
        "smirk_iyeoka_teror": `
          <strong>☠️ The Phantom Trickster</strong><br/>
          Pure terror wrapped in poetry. You haunt memories like a midnight whisper.
        `,
        "smirk_iyeoka_yokluk": `
          <strong>🌫️ The Ghost of Memories</strong><br/>
          Pure silence. Pure heartbreak. Pure absence. You haunt like mist long after you’ve gone.
        `,
      
        // rage + kalpsizsin
        "rage_kalpsizsin_asalet": `
          <strong>🔥 The Queen of Scars</strong><br/>
          Pure flame and grace. You burn bridges and walk away like a masterpiece. Pure heartbreak, pure beauty.
        `,
        "rage_kalpsizsin_teror": `
          <strong>☄️ The Pure Cataclysm</strong><br/>
          Pure destruction. Pure terror. Pure chaos. You don’t wait for endings — you create them.
        `,
        "rage_kalpsizsin_yokluk": `
          <strong>🌑 The Voidbringer</strong><br/>
          Pure silence. Pure desolation. Pure heartbreak. You destroy worlds and disappear like mist.
        `,
      
        // rage + netdmusic
        "rage_netdmusic_asalet": `
          <strong>🔥 The Royal Rager</strong><br/>
          Pure flames. Pure dominance. Pure pride. You walk into the room, burn it down, and leave like a god.
        `,
        "rage_netdmusic_teror": `
          <strong>☠️ The Pure Terror</strong><br/>
          Pure fury. Pure wrath. Pure ruin. You destroy everything in your path and walk away like it's nothing.
        `,
        "rage_netdmusic_yokluk": `
          <strong>🌊 The Sea of Silence</strong><br/>
          Pure emotion. Pure heartbreak. Pure silence. You leave like a storm and haunt like a wave.
        `,
      
        // rage + iyeoka
        "rage_iyeoka_asalet": `
          <strong>🌙 The Storm Siren</strong><br/>
          Pure emotion. Pure beauty. Pure devastation. You draw them in like a wave and disappear like mist.
        `,
        "rage_iyeoka_teror": `
          <strong>☄️ The Haunting Inferno</strong><br/>
          Pure terror. Pure flame. Pure silence. You burn long after the room goes quiet.
        `,
        "rage_iyeoka_yokluk": `
          <strong>🌑 The Final Eclipse</strong><br/>
          Pure void. Pure heartbreak. Pure silence. You destroy quietly and haunt endlessly.
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



