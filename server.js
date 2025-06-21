const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Define path to store entries
const DATA_FILE = path.join(__dirname, 'data', 'entries.json');

// Middleware to serve static files and parse JSON
app.use(express.static('public'));
app.use(express.json());

// Get all diary entries
app.get('/entries', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

// Save a new diary entry
app.post('/entries', (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ success: false, message: 'Text is required.' });
  }

  const newEntry = {
    text: text.trim(),
    date: new Date().toLocaleString(),
  };

  let entries = [];
  if (fs.existsSync(DATA_FILE)) {
    entries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }

  entries.push(newEntry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));

  res.json({ success: true, entry: newEntry });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 Diary server running at http://localhost:${PORT}`);
});
