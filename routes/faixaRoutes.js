const express = require('express');
const router = express.Router();
const faixaController = require('../controllers/faixaController');

router.get('/:discoId', faixaController.listFaixas);
router.post('/:discoId/add', faixaController.addFaixa);
router.get('/:id/edit', faixaController.editFaixaForm);
router.post('/:id/edit', faixaController.editFaixa);
router.post('/:id/delete', faixaController.deleteFaixa);

module.exports = router;