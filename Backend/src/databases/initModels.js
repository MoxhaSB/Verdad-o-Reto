const db = require("./db");
const poblarRetos = require("../Seeders/reto.seeder");
const poblarVerdades = require("../Seeders/verdad.seeder");

const initModels = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS jugadores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL
      )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS verdades(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        textoVerdad TEXT NOT NULL,
        nivel VARCHAR(255) NOT NULL
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS retos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        textoReto TEXT NOT NULL,
        nivel VARCHAR(255) NOT NULL
        )
    `);

    console.log("\n\nIniciando modelos de la base de datos:");
    console.log("  tabla de jugadores [OK]");
    console.log("  tabla de verdades .[OK]");
    console.log("  tabla de retos ....[OK]");

  });
  poblarRetos();
  poblarVerdades();
};

module.exports = initModels;
