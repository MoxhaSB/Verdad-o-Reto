const db = require("../databases/db");

/**
 * QUERY PARA BUSCAR UN JUGADOR POR SU NOMBRE
 * @param {*} nombre es el nombre del jugador a buscar
 * @returns el jugador encontrado o null si no se encuentra ningún jugador con ese nombre
 */
async function  buscarPorNombre(nombre) {
  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM jugadores WHERE nombre = ?`;

    db.get(query, [nombre], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: row ? row.id : null,
          nombre: row ? row.nombre : null
        });
      }
    });
  });
}

/**
 * Query para buscar un jugador por su id
 * @param {*} id id del jugador a buscar
 * @returns el id y el nombre del jugador encontrado o null si no se encuentra ningún jugador con ese id
 */
async function buscarPorID(id){
    return new Promise((resolve, reject) => {

        const query = `SELECT * FROM jugadores WHERE id = ?`;
        
        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: row ? row.id : null,
                    nombre: row ? row.nombre : null
                });
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

/**
 * Query para actualizar el nombre de un jugador por su id
 * @param {*} id id del jugador a actualizar
 * @param {*} nombre nombre nuevo del jugador a actualizar
 * @returns el número de filas afectadas (debería ser 1 si se actualizó correctamente, o 0 si no se encontró el jugador)
 */
async function actualizar(id, nombre) {
  return new Promise((resolve, reject) => {

    const query = `UPDATE jugadores SET nombre = ? WHERE id = ?`;

    db.run(query, [nombre, id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id,
          nombre
        });
      }
    });
  });
}

module.exports = {buscarPorNombre, buscarPorID,  crear, eliminar, obtener, actualizar}