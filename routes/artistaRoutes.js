const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

router.get('/recentes', async (req, res) => {
    try {
        const artistas = await artistaController.getRecentArtistas();
        res.json(artistas); // Retorna os artistas recentes como JSON
    } catch (error) {
        console.error('Erro ao buscar artistas recentes:', error);
        res.status(500).json({ error: 'Erro ao buscar artistas recentes.' });
    }
});

router.get('/', artistaController.listarArtistas);

router.get('/add', artistaController.adicionarArtistaForm); // Formulário para adicionar artista
router.post('/add', artistaController.adicionarArtista);    // Processa a criação do artista

router.get('/:id/edit', artistaController.editarArtistaForm); // Formulário de edição
router.post('/:id/edit', artistaController.editarArtista);    // Atualizar o artista

router.post('/:id/delete', artistaController.excluirArtista);

router.get('/:id', artistaController.detalhesArtista);

module.exports = router;