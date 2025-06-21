# 🌩️ ALARASUCAN: Chaos Diary

A chaotic, neon-drenched web application where users can log their daily mental mayhem, take a chaos personality quiz, and jam out to curated sounds and videos. Styled with glitchy cyber aesthetics and animated effects.

---

## 💡 Features

- 🎀 **Diary Entry** — Write your daily chaos confessions and save them with a timestamp.
- 🌀 **Chaos Quiz** — Determine your chaos archetype (Shadow Operator, Neon Drifter, Fire Glitch, etc.).
- ⏳ **Live Countdown** — Tracks time left until 1st September 2025 (BLN Arrival).
- 🎧 **Media Section** — Embedded Spotify & YouTube experiences.
- 🖤 **Floating Entries View** — Stylized, animated post-it-style notes displaying past entries.

---

## 🧪 Tech Stack

| Area             | Technology                     |
|------------------|--------------------------------|
| Frontend         | HTML, CSS (glassmorphism), JS  |
| Backend          | Node.js, Express.js            |
| Styling          | Custom CSS animations, Google Fonts |
| Storage          | JSON file (`data/entries.json`) |
| Media            | Spotify Embed, YouTube Iframe  |
| Hosting (local)  | Runs on `localhost:3000`       |

---

## 📁 Folder Structure

alarasucan/
├── data/
│ └── entries.json # All saved entries
├── public/
│ ├── css/
│ │ └── style.css
│ ├── js/
│ │ └── script.js
│ ├── pages/
│ │ ├── diary.html
│ │ ├── games.html
│ │ ├── music.html
│ └── index.html
├── server/
│ └── server.js # Express server
├── .gitignore
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🚀 Getting Started

1. **Install dependencies** (if needed):
   ```bash
   npm install
Run the server:

bash
Copy
Edit
node server.js
Open the app:
Go to http://localhost:3000

📝 API Endpoints
GET /entries
Returns all saved diary entries from data/entries.json.

POST /entries
Saves a new diary entry with:

json
Copy
Edit
{
  "text": "string"
}
⚙️ Development Notes
Data is locally stored for full privacy.

The countdown timer is embedded in index.html and uses setInterval.

Entries are shown in a creative, randomized layout using CSS variables.

Style and animations aim to evoke a digital dystopian aesthetic.

✨ Future Ideas
Export diary as .txt or .pdf.

User login + encryption.

Leaderboard for chaotic quiz archetypes.

Chaos chatbot? 🤖

🐙 Author
Made with ☠️ by Pelin Su Turan

📸 Screenshots
(Add screenshots or visuals here if publishing on GitHub)

yaml
Copy
Edit

---

