const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// ✅ IMPORTANT: Use process.env.PORT for Render
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'data', 'entries.json');

// Middleware
app.use(express.static('public'));
app.use(express.json());

/**
 * Get all diary entries
 */
app.get('/entries', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

/**
 * Save a new diary entry
 */
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

/**
 * Route for root to serve the main page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});

