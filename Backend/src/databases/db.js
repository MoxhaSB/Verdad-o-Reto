const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar SQLite:", err.message);
  } else {
    console.log("Base SQLite corriendo...");
  }
});

module.exports = db;
