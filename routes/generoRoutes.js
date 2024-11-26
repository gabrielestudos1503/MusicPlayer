const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

router.get('/recentes', async (req, res) => {
    try {
        const generos = await generoController.getRecentGeneros();
        res.json(generos); // Retorna os gêneros recentes como JSON
    } catch (error) {
        console.error('Erro ao buscar gêneros recentes:', error);
        res.status(500).json({ error: 'Erro ao buscar gêneros recentes.' });
    }
});

router.get('/', generoController.listarGeneros);

router.get('/add', generoController.adicionarGeneroForm);
router.post('/add', generoController.adicionarGenero);

// Formulário para editar gênero
router.get('/:id/edit', generoController.editarGeneroForm);

// Processar a edição do gênero
router.post('/:id/edit', generoController.editarGenero);


router.post('/:id/delete', generoController.deleteGenero);

// Detalhes de um gênero
router.get('/:id', generoController.detalhesGenero);

module.exports = router;