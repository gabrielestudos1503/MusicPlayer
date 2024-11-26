const express = require('express');
const router = express.Router();
const discoController = require('../controllers/discoController');
const upload = require('../config/multer'); // Importa o Multer

router.get('/recentes', async (req, res) => {
    try {
        const discos = await discoController.getRecentDiscos();
        res.json(discos); // Retorna os discos recentes como JSON
    } catch (error) {
        console.error('Erro ao buscar discos recentes:', error);
        res.status(500).json({ error: 'Erro ao buscar discos recentes.' });
    }
});

router.get('/', discoController.listarDiscos); 

router.get('/add', discoController.adicionarDiscoForm); // Altere aqui para 'adicionarDiscoForm'
router.post('/add', upload.single('capa'), discoController.adicionarDisco); // Middleware Multer para upload

router.get('/search', discoController.buscarDiscos); // Altere aqui para 'buscarDiscos'

router.get('/:id', discoController.detalhesDisco);

router.get('/:id/edit', discoController.editarDiscoForm);
router.post('/:id/edit', upload.single('capa'), discoController.editarDisco);

router.post('/:id/delete', discoController.deletarDisco); // Altere aqui para 'deletarDisco'

module.exports = router;