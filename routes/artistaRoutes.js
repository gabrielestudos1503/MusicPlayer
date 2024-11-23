const express = require('express');
const artistaController = require('../controllers/artistaController');
const router = express.Router();

router.get('/', artistaController.list);
router.get('/create', artistaController.createForm);
router.post('/create', artistaController.create);
router.get('/:id', artistaController.details);
router.get('/:id/edit', artistaController.editForm);
router.post('/:id/edit', artistaController.edit);
router.post('/:id/delete', artistaController.delete);

module.exports = router;