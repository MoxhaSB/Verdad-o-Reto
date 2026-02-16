const cors = require("cors");
require("dotenv").config();

/**
 * Función para parsear los orígenes permitidos desde la variable de entorno CORS_ORIGINS
 * @param {*} value el o los orígenes permitidos, separados por comas (son las ips)
 * @returns el valor original si es un solo origen, o un array de orígenes si son varios separados por comas
 */
function parsearOrigenes(value) {
    //retorna el valor si es uno solo, o lo convierte en un array si son varios separados por comas
  return (value || "")
    .split(",") //se separan por comas
    .map(s => s.trim()) //se eliminan espacios en blanco
    .filter(Boolean); //se eliminan valores vacíos (en caso de que haya comas extra)
}

//el o los origenes permitidos
const origenesPermitidos = parsearOrigenes(process.env.CORS_ORIGINS);

const corsOptions = {

  origin: function (origin, callback) {
    // Permitir requests sin Origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);

    //si aun no se han configurado orígenes en el .env
    if (origenesPermitidos.length === 0) {
      return callback(new Error("CORS: no hay orígenes configurados"), false);
    }

    // Verificar si el origen de la solicitud está en la lista de orígenes permitidos
    if (origenesPermitidos.includes(origin)) {
      return callback(null, true);
    }

    // Si el origen no está permitido, rechazar la solicitud
    return callback(new Error("CORS no permitido"), false);

  },
  methods: ["GET", "POST", "PUT", "DELETE"], //métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"]//encabezados permitidos
};

module.exports = cors(corsOptions);
