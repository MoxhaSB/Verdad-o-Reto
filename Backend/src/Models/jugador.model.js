const db = require("../databases/db");

/**
 * QUERY PARA BUSCAR UN JUGADOR POR SU NOMBRE
 * @param {*} nombre es el nombre del jugador a buscar
 * @returns el jugador encontrado o null si no se encuentra ningún jugador con ese nombre
 */
async function  buscar(nombre) {
  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM jugadores WHERE nombre = ?`;

    db.get(query, [nombre], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * QUERY PARA CREAR UN NUEVO JUGADOR
 * @param {*} nombre es el nombre del jugador a crear
 * @returns el id y el nombre del jugador creado
 */
async function crear(nombre) {

  return new Promise((resolve, reject) => {

    const query = `INSERT INTO jugadores (nombre) VALUES (?)`;

    db.run(query, [nombre], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          nombre
        });
      }
    });   
  });
}

/**
 * QUERY PARA ELIMINAR UN JUGADOR POR SU ID
 * @param {*} id es el id del jugador a eliminar
 * @returns el número de filas afectadas (debería ser 1 si se eliminó correctamente, o 0 si no se encontró el jugador)
 */
async function eliminar(id) {
  return new Promise((resolve, reject) => {

    const query = `DELETE FROM jugadores WHERE id = ?`;

    db.run(query, [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

/**
 * Query para obtener todos los jugadores registrados en la base de datos
 * @returns los jugadores encontrados o un array vacío si no se encuentra ningún jugador
 */
async function obtener() {
  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM jugadores`;

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {buscar, crear, eliminar, obtener}