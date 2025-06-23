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
    console.error(error);
    res.status(500).send({ error: 'Database error' });
  }
});

// POST new entry
app.post('/api/entries', async (req, res) => {
  const { text } = req.body;
  const date = new Date().toLocaleString();

  try {
    const result = await db.query(
      'INSERT INTO entries (text, date) VALUES ($1, $2) RETURNING *',
      [text, date]
    );
    res.json({ success: true, entry: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Database error' });
  }
});

// PUT update entry
app.put('/api/entries/:index', async (req, res) => {
  const id = parseInt(req.params.index, 10);
  const { text } = req.body;
  const date = new Date().toLocaleString();

  try {
    const result = await db.query(
      'UPDATE entries SET text = $1, date = $2 WHERE id = $3 RETURNING *',
      [text, date, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send({ error: 'Entry not found' });
    }
    res.json({ success: true, entry: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Database error' });
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
