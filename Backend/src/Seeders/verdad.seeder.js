const db = require("../databases/db");
const { performance } = require("perf_hooks");  

/**
 * verdades suaves para poblar la base de datos
 */
const verdadesSuaves = 
    [
        { textoVerdad: "¿Cuál es tu color favorito?", nivel: "suave" },
        { textoVerdad: "¿Cuál es tu comida favorita?", nivel: "suave" },
        { textoVerdad: "¿Cuál es tu película favorita?", nivel: "suave" },
        { textoVerdad: "¿Cuál es tu canción favorita?", nivel: "suave" },
        { textoVerdad: "¿Cuál es tu animal favorito?", nivel: "suave" },
        { textoVerdad: "¿Cuál es tu deporte favorito?", nivel: "suave" },
        { textoVerdad: "¿Cuál es tu libro favorito?", nivel: "suave" },
    ];

    /**
     * verdades medias para poblar la base de datos
     */
const verdadesMedias =
    [
        { textoVerdad: "¿Cuál es tu mayor miedo?", nivel: "medio" },
        { textoVerdad: "¿Cuál es tu mayor secreto?", nivel: "medio" },
        { textoVerdad: "¿Cuál es tu mayor arrepentimiento?", nivel: "medio" },
        { textoVerdad: "¿Cuál es tu mayor fantasía?", nivel: "medio" },
        { textoVerdad: "¿Cuál es tu mayor logro?", nivel: "medio" },
        { textoVerdad: "¿Cuál es tu mayor fracaso?", nivel: "medio" },
        { textoVerdad: "¿Cuál es tu mayor deseo?", nivel: "medio" },
    ];

    /**
     * verdades extremas para poblar la base de datos
     */
const verdadesExtremas =
    [
        { textoVerdad: "¿Cuál es tu mayor secreto inconfesable?", nivel: "extremo" },
        { textoVerdad: "¿Cuál es tu mayor fantasía sexual?", nivel: "extremo" },
        { textoVerdad: "¿Cuál es tu mayor arrepentimiento amoroso?", nivel: "extremo" },
        { textoVerdad: "¿Cuál es tu mayor miedo irracional?", nivel: "extremo" },
        { textoVerdad: "¿Cuál es tu mayor secreto vergonzoso?", nivel: "extremo" },
        { textoVerdad: "¿Cuál es tu mayor secreto oscuro?", nivel: "extremo" },
        { textoVerdad: "¿Cuál es tu mayor secreto inconfesable?", nivel: "extremo" },
    ]; 

    /**
     * función para insertar las verdades en la base de datos
     */
const rellenarVerdades = () => {
    const startTime = performance.now(); // Inicia el temporizador

    verdadesSuaves.forEach((verdad) => {
        db.run(
            `INSERT INTO verdades (textoVerdad, nivel) VALUES (?, ?)`,
            [verdad.textoVerdad, verdad.nivel],
            (err) => {
                if (err) {
                    console.error("Error al insertar verdad:", err);
                }
            }
        );
    });
    console.log(" -> Verdades suaves insertadas.....[OK] " + (performance.now() - startTime).toFixed(2) + " ms");

    verdadesMedias.forEach((verdad) => {
        db.run(
            `INSERT INTO verdades (textoVerdad, nivel) VALUES (?, ?)`,
            [verdad.textoVerdad, verdad.nivel],
            (err) => {  
                if (err) {
                    console.error("Error al insertar verdad:", err);
                } 
            }
        );
    });
    console.log(" -> Verdades medias insertadas.....[OK] " + (performance.now() - startTime).toFixed(2) + " ms");

    verdadesExtremas.forEach((verdad) => {
        db.run(
            `INSERT INTO verdades (textoVerdad, nivel) VALUES (?, ?)`,
            [verdad.textoVerdad, verdad.nivel],
            (err) => {
                if (err) {
                    console.error("Error al insertar verdad:", err);
                }  
            }
         );
    });
    console.log(" -> Verdades extremas insertadas...[OK] " + (performance.now() - startTime).toFixed(2) + " ms");
}

module.exports = rellenarVerdades;