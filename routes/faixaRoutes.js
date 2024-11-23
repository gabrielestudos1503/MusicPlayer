const express = require('express');
const faixaController = require('../controllers/faixaController');
const router = express.Router();

router.get('/disco/:discoId', faixaController.list);
router.get('/disco/:discoId/create', faixaController.createForm);
router.post('/disco/:discoId/create', faixaController.create);
router.get('/:id/edit', faixaController.editForm);
router.post('/:id/edit', faixaController.edit);
router.post('/:id/delete', faixaController.delete);

module.exports = router;