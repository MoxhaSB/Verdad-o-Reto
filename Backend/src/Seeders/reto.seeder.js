const db = require("../databases/db");
const {performance} = require("perf_hooks");

/**
 * retos suaves para poblar la base de datos
 */
const retosSuaves = 
    [
        { textoReto: "Baila sin música durante 1 minuto", nivel: "suave" },
        { textoReto: "Canta una canción a todo pulmón", nivel: "suave" },
        { textoReto: "Cuenta un chiste malo", nivel: "suave" },
        { textoReto: "Imita a un animal durante 30 segundos", nivel: "suave" },
        { textoReto: "Baila como si nadie te estuviera viendo durante 1 minuto", nivel: "suave" },
        { textoReto: "Haz una imitación de tu celebridad favorita", nivel: "suave" },
        { textoReto: "Haz una cara graciosa durante 30 segundos", nivel: "suave" },
    ];

    /**
     * retos medios para poblar la base de datos
     */
const retosMedios = 
    [
        { textoReto: "Haz 10 sentadillas", nivel: "medio" },
        { textoReto: "Bebe un vaso de agua con limón", nivel: "medio" },
        { textoReto: "Haz una llamada telefónica a un amigo y cuéntale un secreto", nivel: "medio" },
        { textoReto: "Haz una pose de yoga durante 30 segundos", nivel: "medio" },
        { textoReto: "Haz una imitación de tu profesor favorito", nivel: "medio" },
        { textoReto: "Haz una cara de susto durante 15 segundos", nivel: "medio" },
        { textoReto: "Baila como si estuvieras en una discoteca durante 30 segundos", nivel: "medio" },

    ];

    /**
     * retos extremos para poblar la base de datos
     */
const retosExtremos = 
    [
        {textoReto: "Come una cucharada de salsa picante", nivel: "extremo"},
        {textoReto: "Haz 20 flexiones", nivel: "extremo"},
        {textoReto: "Bebe un vaso de agua con sal", nivel: "extremo"},
        {textoReto: "Haz una llamada telefónica a un amigo y canta una canción", nivel: "extremo"},
        {textoReto: "Haz una pose de yoga durante 1 minuto", nivel: "extremo"},
        {textoReto: "Haz una imitación de tu profesor favorito", nivel: "extremo"},
        {textoReto: "Haz una cara de susto durante 30 segundos", nivel: "extremo"},
    ];

    /**
     * función para insertar los retos en la base de datos
     */
const rellenarRetos = async () => {
    const startTime = performance.now(); // Inicia el temporizador
    
    retosSuaves.forEach((reto) => {
        db.run(
            `INSERT INTO retos (textoReto, nivel) VALUES (?, ?)`,
            [reto.textoReto, reto.nivel],
            (err) => {
                if (err) {
                    console.error("Error al insertar reto:", err);
                }
            }
        );
    });
    console.log(" -> Retos suaves insertados........[OK] " + (performance.now() - startTime).toFixed(2) + " ms");

    retosMedios.forEach((reto) => {
        db.run(
            `INSERT INTO retos (textoReto, nivel) VALUES (?, ?)`,
            [reto.textoReto, reto.nivel],
            (err) => {
                if (err) {
                    console.error("Error al insertar reto:", err);
                }
            }
        );
    });
    console.log(" -> Retos medios insertados........[OK] " + (performance.now() - startTime).toFixed(2) + " ms");

    retosExtremos.forEach((reto) => {
        db.run(
            `INSERT INTO retos (textoReto, nivel) VALUES (?, ?)`,
            [reto.textoReto, reto.nivel],
            (err) => {
                if (err) {
                    console.error("Error al insertar reto:", err);
                }
            }
        );
    });
    console.log(" -> Retos extremos insertados......[OK] " + (performance.now() - startTime).toFixed(2) + " ms");
};

module.exports = rellenarRetos;