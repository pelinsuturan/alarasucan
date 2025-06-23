// database.js
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is NOT set! Check your environment settings.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ✅ Required for Render deployments
  ssl: {
    rejectUnauthorized: false,
  },
});

// ⚡️ Create the table if it doesn’t already exist
async function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS entries (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('✅ Entries table is ready!');
  } catch (error) {
    console.error('❌ Error initializing database', error);
    process.exit(1);
  }
}

// ⚡️ Initialize database on launch
initDatabase();

// Export the pool for direct access if needed
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
