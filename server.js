const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database'); // ✅ Import database.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

/**
 * ⚡️ API ENDPOINTS
 */

// GET all entries
app.get('/api/entries', (req, res) => {
  const rows = db.prepare('SELECT * FROM entries ORDER BY id DESC').all();
  res.json(rows);
});

// POST new entry
app.post('/api/entries', (req, res) => {
  const entry = {
    text: req.body.text,
    date: new Date().toLocaleString(),
  };
  const stmt = db.prepare('INSERT INTO entries (text, date) VALUES (?, ?)');
  const result = stmt.run(entry.text, entry.date);
  entry.id = result.lastInsertRowid;

  res.json({ success: true, entry });
});

// PUT update entry
app.put('/api/entries/:index', (req, res) => {
  const id = parseInt(req.params.index, 10);
  const entry = {
    text: req.body.text,
    date: new Date().toLocaleString(),
  };
  const stmt = db.prepare('UPDATE entries SET text = ?, date = ? WHERE id = ?');
  const result = stmt.run(entry.text, entry.date, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  res.json({ success: true, entry: { id, ...entry } });
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
