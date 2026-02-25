const app = require('express');
const jugadorService = require('../Services/jugador.service');

/**
 * Función que crea un jugador y devuelve el id y nombre.
 * @param {*} req el request que viene de frontend con el nombre del jugador a crear en el body
 * @param {*} res el jugador creado con su id y nombre o el error que se haya producido al intentar crear el jugador
 */
async function crear(req, res) {

    try{
        //el nombre viene de front
        const { nombre } = req.body;
        const jugador = await jugadorService.crear(nombre);

        res.status(201).json(jugador);
        console.log(`   -> [jugador.controller.js] Jugador creado: ${nombre} con id: ${jugador.id}`);

    }catch(error){
        //se envia el error del status o 500, además se envia el mensaje de error personalizado
        res.status(error.status || 500).json({ error: error.message });
        console.error(`   -> Error al crear jugador: ${error.message}`);
    }
    
}

/**
 * Función que obtiene todos los jugadores de la base de datos y los devuelve en formato JSON
 * @param {*} _ se deja el primer parámetro como _ porque no se utiliza, pero es necesario para que el segundo parámetro sea res
 * @param {*} res la respuesta a frontend con el usuario o el error que se haya producido
 */
async function obtener(_, res){
    try{

        const jugadores = await jugadorService.obtener();

        res.status(200).json(jugadores);
        console.log(`   -> [jugador.controller.js] Jugadores obtenidos: ${jugadores.map(j => j.nombre).join(", ")}`);

    }catch(error){
        res.status(error.status || 500).json({error: error.message});
        console.error(`   -> Error al obtener jugadores: ${error.message}`);
    }
}

/**
 * Función que elimina un jugador por su id
 * @param {*} req ID del jugador a eliminar 
 * @param {*} res 
 */
async function eliminar(req, res) {
    try{

        //el id a eliminar
        const { id } = req.params;
        const eliminado = await jugadorService.eliminar(id);
        
        if(!eliminado){
            res.status(404).json({error: "Jugador no encontrado"});
            console.log(`   -> [jugador.controller.js] Se intentó eliminar jugador con id: ${id}, no existe un jugador con ese id`);
            return;
        }
        res.status(200).json({message: "Jugador eliminado correctamente"});
        console.log(`   -> [jugador.controller.js] Jugador eliminado con id: ${id}`);

    }catch(error){
        res.status(error.status || 500).json({error: error.message});
        console.error(`   -> Error al eliminar jugador: ${error.message}`);
    }
}

/**
 * Funcuon que actualiza el nombre de un jugador por su id
 * @param {*} req los parámetros de la url con el id del jugador a actualizar y el nuevo nombre en el body
 * @param {*} res si se actualizó correctamente el jugador o el error que se haya producido al intentar actualizar el jugador
 */
async function actualizar(req, res) {
    try{

        const { id } = req.params;//se pasa porque es de la url
        const { nombre } = req.body;

        //se llama a la función de servicio para actualizar el jugador
        const { jugadorActualizado, nombreAnterior } = await jugadorService.actualizar(id, nombre);

        if(jugadorActualizado === 0){
            res.status(404).json({error: "Jugador no encontrado"});
            console.log(`   -> [jugador.controller.js] Jugador no encontrado con id: ${id}`);
            return;
        }

        res.status(200).json({id: jugadorActualizado.id, nombre: jugadorActualizado.nombre});
        console.log(`   -> [jugador.controller.js] Jugador con id: ${id} ha cambiado su nombre: "${nombreAnterior}" -> "${jugadorActualizado.nombre}"`);

    }catch(error){
        res.status(error.status || 500).json({error: error.message});
        //console.log(error.stack);
        console.error(`   -> ${error.message}`);
    }
}

module.exports = { obtener, crear, eliminar, actualizar };