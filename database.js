const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, 'src', 'data', 'entries.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    date TEXT NOT NULL
  );
`);

module.exports = db;
