const express = require('express');
const router = express.Router();
const verdadController = require('../Controllers/verdad.controller');

router.get('/', verdadController.obtener);
router.post('/', verdadController.crear);
router.delete('/:id', verdadController.eliminar);

module.exports = router;