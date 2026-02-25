const jugadoresModel = require('../Models/jugador.model');

/**
 * Función para obtener todos los jugadores de la base de datos
 * @returns los jugadores obtenidos de la base de datos
 */
async function obtener() {

    const jugadores = await jugadoresModel.obtener();

    //validación de datos
    if(jugadores.length === 0){
        const error = new Error("[jugador.service.js] No hay jugadores registrados"); //se crea un error personalizado
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
        const error = new Error("[jugador.service.js] El nombre del jugador no puede estar vacío");
        error.status = 400;
        throw error;
    }

    //validar que el nombre no tenga más de 50 caracteres
    if(nombreNormalizado.length > 50){
        const error = new Error("[jugador.service.js] El nombre del jugador no puede tener más de 50 caracteres");
        error.status = 400;
        throw error;
    }
    //validar que el nombre solo contenga letras, números y espacios
    if(/^[a-zA-Z0-9\s]+$/.test(nombreNormalizado) === false){
        const error = new Error("[jugador.service.js] El nombre del jugador solo puede contener letras, números y espacios");
        error.status = 400;
        throw error;
    }

    //validar que el nombre no exista ya en la base de datos
    const jugadorExistente = await jugadoresModel.buscarPorNombre(nombreNormalizado);

    if(jugadorExistente != null && jugadorExistente.nombre != null){
        const error = new Error("[jugador.service.js] El jugador ya existe");
        error.status = 400;
        throw error;
    }

    return await jugadoresModel.crear(nombreNormalizado);
}

/**
 * Función para eliminar un jugador de la base de datos por su id
 * @param {*} id id del jugador a eliminar
 * @returns true si se eliminó, false si no
 */
async function eliminar(id) {
    
    //si es mayor a 10, menor a 0, no es un número o no es un entero, se lanza un error
    if(id < 0 || isNaN(id) || !Number.isInteger(Number(id))){
        const error = new Error("[jugador.service.js] El id del jugador no es válido");
        error.status = 400;
        throw error;
    }
    //verificar si hay jugadores registrados
    const jugadores = await jugadoresModel.obtener();

    if(jugadores.length === 0){
        const error = new Error("[jugador.service.js] No hay jugadores registrados");
        error.status = 404;
        throw error;
    }

    const eliminado = await jugadoresModel.eliminar(id);
    return eliminado ? true : false; //si eliminado es 1 (true) se devuelve true, si es 0 (false) se devuelve false
}

/**
 * Función para actualizar el nombre de un jugador por su id
 * @param {*} id id del jugador a actualizar
 * @param {*} nombre nombre nuevo del jugador a actualizar
 * @returns el jugador actualizado o un error si no se pudo actualizar
 */
async function actualizar(id, nombre){


    //nombre normalizado (eliminar espacios al inicio y al final)
    const nombreNormalizado = nombre.trim();

    //si nombre o id son undefined, se lanza un error
    if(id === undefined || nombre === undefined || id === null || nombre === null){
        const error = new Error("[jugador.service.js] El id o nombre del jugador no pueden estar vacíos");
        error.status = 400;
        throw error;
    }

    //si es mayor a 10, menor a 0, no es un número o no es un entero, se lanza un error
    if(id < 0 || isNaN(id) || !Number.isInteger(Number(id))){
        const error = new Error("[jugador.service.js] El id del jugador no es válido");
        error.status = 400;
        throw error;
    }

    //validar que el nombre no esté vacío
    if(nombre.trim().length === 0){
        const error = new Error("[jugador.service.js] El nombre del jugador no puede estar vacío");
        error.status = 400;
        throw error;
    }
    
    //validar que el nombre solo contenga letras, números y espacios
    if(/^[a-zA-Z0-9\s]+$/.test(nombreNormalizado) === false){
        const error = new Error("[jugador.service.js] El nombre del jugador solo puede contener letras, números y espacios");
        error.status = 400;
        throw error;
    }

    //primero se busca si el id que se mandó existe en la base de datos
    const idExistente = await jugadoresModel.buscarPorID(id);
    if(!idExistente || idExistente.id === null){
        const error = new Error("[jugador.service.js] No existe un jugador con ese id");
        error.status = 400;
        throw error;
    }

    //se busca si existe el nombre en la base de datos
    const jugadorNombreExistente = await jugadoresModel.buscarPorNombre(nombreNormalizado);

    //si el el nombre es igual al actual
    if(jugadorNombreExistente.nombre === nombreNormalizado && jugadorNombreExistente.id === Number(id)){
        const error = new Error("[jugador.service.js] El nombre del jugador es el mismo que el actual");
        error.status = 400;
        throw error;
    }
    

    if(jugadorNombreExistente.nombre == null && jugadorNombreExistente.id == null){

        //no existe un jugador con ese nombre, por lo tanto se puede actualizar 
        const jugadorActualizado = await jugadoresModel.actualizar(id, nombre.trim());
        const nombreAnterior = idExistente.nombre;
        return {jugadorActualizado: jugadorActualizado, nombreAnterior: nombreAnterior};

    } else if(jugadorNombreExistente.nombre === nombreNormalizado && jugadorNombreExistente.id !== Number(id)){
        //existe un jugador con ese nombre pero no es el mismo que se quiere actualizar, por lo tanto no se puede actualizar
        const error = new Error("[jugador.service.js] El nombre del jugador ya existe");
        error.status = 400;
        throw error;
    }

}

module.exports = { obtener, crear, eliminar, actualizar };