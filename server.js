const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, 'data');
const ENTRIES_FILE = path.join(DATA_DIR, 'entries.json');

// ✅ Ensure the data directory and entries.json file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}
if (!fs.existsSync(ENTRIES_FILE)) {
  fs.writeFileSync(ENTRIES_FILE, JSON.stringify([], null, 2));
}

// ⚡️ Helper Functions
function loadEntries() {
  return JSON.parse(fs.readFileSync(ENTRIES_FILE, 'utf8'));
}

function saveEntries(data) {
  fs.writeFileSync(ENTRIES_FILE, JSON.stringify(data, null, 2));
}

// ⚡️ API ENDPOINTS
app.get('/api/entries', (req, res) => {
  res.json(loadEntries());
});

app.post('/api/entries', (req, res) => {
  const entries = loadEntries();
  const entry = {
    text: req.body.text,
    date: new Date().toLocaleString(),
  };
  entries.push(entry);
  saveEntries(entries);
  res.json({ success: true, entry });
});

app.put('/api/entries/:index', (req, res) => {
  const entries = loadEntries();
  const index = parseInt(req.params.index, 10);

  if (index < 0 || index >= entries.length) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  entries[index] = {
    ...entries[index],
    text: req.body.text,
    date: new Date().toLocaleString(),
  };
  saveEntries(entries);
  res.json({ success: true, entry: entries[index] });
});

// ⚡️ Serve static site
app.use(express.static(path.join(__dirname, 'public')));

// Route for SPA or static site
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ⚡️ START SERVER
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
