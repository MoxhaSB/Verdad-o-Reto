const express = require('express');
const router = express.Router();
const jugadorController = require('../Controllers/jugador.controller');

router.get('/', jugadorController.obtener);
router.post('/', jugadorController.crear);
router.delete('/:id', jugadorController.eliminar);

module.exports = router;