const express = require('express');
const router = express.Router();
const discoController = require('../controllers/discoController');
const upload = require('../config/multer'); 

router.get('/recentes', async (req, res) => {
    try {
        const discos = await discoController.getRecentDiscos();
        res.json(discos); 
    } catch (error) {
        console.error('Erro ao buscar discos recentes:', error);
        res.status(500).json({ error: 'Erro ao buscar discos recentes.' });
    }
});

router.get('/', discoController.listarDiscos); 
router.get('/add', discoController.adicionarDiscoForm);
router.post('/add', upload.single('capa'), discoController.adicionarDisco);
router.get('/search', discoController.buscarDiscos); 
router.get('/:id', discoController.detalhesDisco);
router.get('/:id/edit', discoController.editarDiscoForm);
router.post('/:id/edit', upload.single('capa'), discoController.editarDisco);
router.post('/:id/delete', discoController.deletarDisco); 

module.exports = router;