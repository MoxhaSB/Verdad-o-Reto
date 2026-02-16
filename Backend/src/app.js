const express = require("express");
const cors = require("./config/cors");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./databases/db");
const initModels = require("./databases/initModels");

//Variables de las rutas
const jugadorRoutes = require("./Routes/jugador.route");
//const verdadRoutes = require("./Routes/verdad.route");
//const retoRoutes = require("./Routes/reto.route");

// Crear una instancia de Express 
const app = express();
// Configuración de CORS
app.use(cors);
//configuración para recibir datos en formato JSON
app.use(express.json());
// Inicializar tablas
initModels();

// Ruta de prueba para verificar que el backend está funcionando
app.get("/", (req, res) => {
  res.send("Backend funcionando con SQLite");
});


//Definicion de rutas
app.use("/jugadores", jugadorRoutes);
//app.use("/verdades", verdadRoutes);
//app.use("/retos", retoRoutes);

//link base de datos
const PORT = process.env.PORT;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo: http://localhost:${PORT}`);
});
