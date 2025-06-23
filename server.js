// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database'); // ✅ Import database.js
require('dotenv').config(); // ✅ Ensure this is called early

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

/**
 * ⚡️ API ENDPOINTS
 */

// GET all entries
app.get('/api/entries', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM entries ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('GET /api/entries error:', error);
    res.status(500).send({ error: 'Database error' });
  }
});

// POST new entry
app.post('/api/entries', async (req, res) => {
  const { text, alias } = req.body; // <-- Change: also get alias

  if (!text) {
    return res.status(400).send({ error: 'Text is required' });
  }

  const date = new Date().toLocaleString();
  try {
    const result = await db.query(
      'INSERT INTO entries (text, date, alias) VALUES ($1, $2, $3) RETURNING *', // <-- Change: add alias to query
      [text, date, alias] // <-- Change: pass alias as a value
    );
    res.json({ success: true, entry: result.rows[0] });
  } catch (error) {
    console.error('POST /api/entries error:', error);
    res.status(500).send({ error: 'Database error' });
  }
});

// PUT update entry
app.put('/api/entries/:index', async (req, res) => {
  const id = parseInt(req.params.index, 10);
  const { text } = req.body;

  if (!text) {
    return res.status(400).send({ error: 'Text is required' }); // ✅ Guard against empty text
  }

  const date = new Date().toLocaleString();
  try {
    const result = await db.query(
      'UPDATE entries SET text = $1, date = $2 WHERE id = $3 RETURNING *',
      [text, date, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send({ error: 'Entry not found' }); // ✅ Clarifies error
    }
    res.json({ success: true, entry: result.rows[0] }); // ✅ Will work with fetch
  } catch (error) {
    console.error('PUT /api/entries error:', error);
    res.status(500).send({ error: 'Database error' }); // ✅ Clear error
  }
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
