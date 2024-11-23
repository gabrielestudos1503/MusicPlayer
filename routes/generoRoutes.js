const express = require('express');
const generoController = require('../controllers/generoController');
const router = express.Router();

router.get('/', generoController.list);
router.get('/create', generoController.createForm);
router.post('/create', generoController.create);
router.get('/:id', generoController.details);
router.get('/:id/edit', generoController.editForm);
router.post('/:id/edit', generoController.edit);
router.post('/:id/delete', generoController.delete);

module.exports = router;