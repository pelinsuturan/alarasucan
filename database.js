const Database = require('better-sqlite3');
const path = require('path');

// Point to a database file in your app directory
const db = new Database(path.join(__dirname, 'data', 'entries.db'));

// Create table if it doesn’t exist
db.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    date TEXT NOT NULL
  );
`);

module.exports = db;
