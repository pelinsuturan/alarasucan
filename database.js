// database.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data', 'entries.json');

function readEntries() {
  if (!fs.existsSync(dataPath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

function writeEntries(entries) {
  fs.writeFileSync(dataPath, JSON.stringify(entries, null, 2));
}

module.exports = {
  getAllEntries: function() {
    return readEntries();
  },
  addEntry: function(entry) {
    const entries = readEntries();
    entry.id = entries.length + 1;
    entries.unshift(entry);
    writeEntries(entries);
    return entry;
  },
  updateEntry: function(id, updated) {
    const entries = readEntries();
    const index = entries.findIndex(entry => entry.id === id);
    if (index === -1) return null;

    entries[index] = { id, ...updated };
    writeEntries(entries);
    return entries[index];
  }
};
