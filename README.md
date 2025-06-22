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


---





⚡️ Environment Variables
The project uses environment variables to configure its behavior across environments (local and production). This approach allows sensitive information and environment-specific settings to remain secure and separate from your codebase.

🛠️ Location & Usage
Local Development:
Create a .env file in the root directory of your project.
This file is NOT committed to version control (it’s listed in .gitignore), ensuring sensitive information stays private.

Production (Render):
In Render, these values are configured via the Environment tab of your Web Service.
Render securely stores and injects them into your application when it starts.

📋 Environment Variable List
Here’s an example of the environment variables you might use:

Variable Name	Description	Default/Example
PORT	The port number on which the Node.js app will listen.	3000
NODE_ENV	Defines the environment (development or production) used for optimization and logging.	development / production
SECRET_KEY	A secret key used for signing tokens, encrypting data, or other security-related operations.	your-super-secret-key
API_KEY	An example placeholder for any external service or internal feature (e.g., database connections).	your-api-key
DB_URL	The database URL (if applicable).	mongodb://localhost:27017/myapp
DOMAIN_NAME	The primary domain name for deployment.	alarasucan.com
CLOUDFLARE_TOKEN	Optional: Token used for automatic deployments / DNS management via the Cloudflare API.	your-cloudflare-api-token
RENDER_API_KEY	Optional: Token used for triggering deployments or accessing the Render API.	your-render-api-key

✅ How to Use Environment Variables in the App
Environment variables can be accessed via process.env within your Node.js app. For example:

javascript
Copy
Edit
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`🔥 Server running in ${NODE_ENV} mode at http://localhost:${PORT}`);
});
⚙️ Setup Summary
✅ Local Development:

Create .env in the root directory.

Add environment variables:

ini
Copy
Edit
PORT=3000
NODE_ENV=development
SECRET_KEY=mySecretKey
Install dotenv (npm install dotenv) and load it in your server.js:

javascript
Copy
Edit
require('dotenv').config();
✅ Production (Render):

Add environment variables in the Environment tab of your Render service.

Render automatically injects them into the app at build/deployment time.

🔐 Security Best Practices
Never commit .env files to version control.

Never expose sensitive tokens, secrets, or database URLs in public files.

Use Render, Cloudflare, and Squarespace’s settings to securely configure and manage these values.


