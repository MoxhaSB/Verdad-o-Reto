const express = require('express');
const router = express.Router();
const retoController = require('../Controllers/reto.controller'); 

router.get('/', retoController.obtener);
router.post('/', retoController.crear);
router.delete('/:id', retoController.eliminar);

module.exports = router;