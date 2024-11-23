const express = require('express');
const discoController = require('../controllers/discoController');
const router = express.Router();

router.get('/', discoController.list);
router.get('/create', discoController.createForm);
router.post('/create', discoController.create);
router.get('/:id', discoController.details);
router.get('/:id/edit', discoController.editForm);
router.post('/:id/edit', discoController.edit);
router.post('/:id/delete', discoController.delete);

module.exports = router;