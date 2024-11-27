const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

router.get('/recentes', async (req, res) => {
    try {
        const artistas = await artistaController.getRecentArtistas();
        res.json(artistas); 
    } catch (error) {
        console.error('Erro ao buscar artistas recentes:', error);
        res.status(500).json({ error: 'Erro ao buscar artistas recentes.' });
    }
});

router.get('/', artistaController.listarArtistas);
router.get('/add', artistaController.adicionarArtistaForm); 
router.post('/add', artistaController.adicionarArtista);   
router.get('/:id/edit', artistaController.editarArtistaForm); 
router.post('/:id/edit', artistaController.editarArtista);  
router.post('/:id/delete', artistaController.excluirArtista);
router.get('/:id', artistaController.detalhesArtista);

module.exports = router;