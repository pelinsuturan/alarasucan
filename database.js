const Database = require('better-sqlite3');
const path = require('path');

// ✅ Point to the database in `src/data`
const db = new Database(path.join(__dirname, 'src', 'data', 'entries.db'));

// ✅ Create table if it doesn’t already exist
db.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    date TEXT NOT NULL
  );
`);

module.exports = db;
