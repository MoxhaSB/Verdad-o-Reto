const jugadoresModel = require('../Models/jugador.model');

/**
 * Función para obtener todos los jugadores de la base de datos
 * @returns los jugadores obtenidos de la base de datos
 */
async function obtener() {

    const jugadores = await jugadoresModel.obtener();

    //validación de datos
    if(jugadores.length === 0){
        const error = new Error("No hay jugadores registrados"); //se crea un error personalizado
        error.status = 404; //se le agrega el status para que lo lea el controller
        throw error;
    } 

    return jugadores;
}

/**
 * Función que crea un jugador en la base de datos
 * @param {*} nombre nombre del jugador a crear
 * @returns id del jugador agregado a la base de datos
 */
async function crear(nombre) {

    //normalizar el nombre del jugador (eliminar espacios al inicio y al final)
    const nombreNormalizado = nombre.trim();

    //validar que el nombre no esté vacío
    if(nombreNormalizado.length === 0){
        const error = new Error("El nombre del jugador no puede estar vacío");
        error.status = 400;
        throw error;
    }

    //validar que el nombre no tenga más de 50 caracteres
    if(nombreNormalizado.length > 50){
        const error = new Error("El nombre del jugador no puede tener más de 50 caracteres");
        error.status = 400;
        throw error;
    }
    //validar que el nombre solo contenga letras, números y espacios
    if(/^[a-zA-Z0-9\s]+$/.test(nombreNormalizado) === false){
        const error = new Error("El nombre del jugador solo puede contener letras, números y espacios");
        error.status = 400;
        throw error;
    }

    //validar que el nombre no exista ya en la base de datos
    const jugadorExistente = await jugadoresModel.buscar(nombreNormalizado);

    if(jugadorExistente){
        const error = new Error("El jugador ya existe");
        error.status = 400;
        throw error;
    }

    return await jugadores.crear(nombreNormalizado);
    
}

/**
 * Función para eliminar un jugador de la base de datos por su id
 * @param {*} id id del jugador a eliminar
 * @returns true si se eliminó, false si no
 */
async function eliminar(id) {
    const eliminado = await jugadoresModel.eliminar(id);
    return eliminado ? true : false; //si eliminado es 1 (true) se devuelve true, si es 0 (false) se devuelve false
}

module.exports = { obtener, crear, eliminar };