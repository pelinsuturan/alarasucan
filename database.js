// database.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // This is required for Render deployments
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create the table if it doesn’t already exist
async function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS entries (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `;
  await pool.query(createTableQuery);
}

initDatabase().catch((err) =>
  console.error('Error initializing database', err)
);

module.exports = pool;
