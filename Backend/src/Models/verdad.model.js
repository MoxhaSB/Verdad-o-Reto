const db = require("../databases/db");

/**
 * Query para obtener todas las verdades de la base de datos
 * @returns un array con todas las verdades encontradas en la base de datos
 */
const obtener =  () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM verdades`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });   
    });
}

module.exports = {obtener};
    