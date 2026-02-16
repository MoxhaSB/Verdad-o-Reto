const db = require("../databases/db");

/**
 * QUERY PARA OBTENER TODOS LOS RETOS
 * @returns un array con todos los retos encontrados en la base de datos
 */
const obtener = () =>{
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM retos`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {obtener};