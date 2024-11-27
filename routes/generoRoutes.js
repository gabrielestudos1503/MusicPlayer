const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

router.get('/recentes', async (req, res) => {
    try {
        const generos = await generoController.getRecentGeneros();
        res.json(generos);
    } catch (error) {
        console.error('Erro ao buscar gêneros recentes:', error);
        res.status(500).json({ error: 'Erro ao buscar gêneros recentes.' });
    }
});

router.get('/', generoController.listarGeneros);
router.get('/add', generoController.adicionarGeneroForm);
router.post('/add', generoController.adicionarGenero);
router.get('/:id/edit', generoController.editarGeneroForm);
router.post('/:id/edit', generoController.editarGenero);
router.post('/:id/delete', generoController.deleteGenero);
router.get('/:id', generoController.detalhesGenero);

module.exports = router;