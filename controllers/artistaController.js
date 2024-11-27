const { Artista, Disco, Genero, Sequelize } = require('../models');

module.exports = {

    async getRecentArtistas(req, res) {
        try {
            const artistas = await Artista.findAll({
                limit: 3,
                order: [['createdAt', 'DESC']],
            });
            return artistas;
        } catch (error) {
            console.error('Erro ao buscar artistas recentes:', error);
            throw error;
        }
    },
    
    async listarArtistas(req, res) {
        try {
            const { nome, genero } = req.query;
    
            const where = {};
            if (nome) where.nome = { [Sequelize.Op.iLike]: `%${nome}%` };
    
            const artistas = await Artista.findAll({
                where,
                include: [
                    { model: Genero, as: 'generos' }, 
                    { model: Disco, as: 'discos' },
                ],
            });
    
            res.render('artistas/listar', { artistas });
        } catch (error) {
            console.error('Erro ao listar os artistas:', error);
            res.status(500).send('Erro ao listar os artistas.');
        }
    },
    
    async adicionarArtistaForm(req, res) {
        try {
            const generos = await Genero.findAll(); 
            res.render('artistas/adicionar', { generos });
        } catch (error) {
            console.error('Erro ao carregar o formulário de adição de artista:', error);
            res.status(500).send('Erro ao carregar o formulário de adição.');
        }
    },

    async adicionarArtista(req, res) {
        try {
            const { nome, generoIds } = req.body;
    
            const artista = await Artista.create({ nome });
    
            if (generoIds) {
                const generoArray = Array.isArray(generoIds) ? generoIds : [generoIds];
                await artista.setGeneros(generoArray);
            }
    
            res.redirect('/artistas');
        } catch (error) {
            console.error('Erro ao adicionar o artista:', error);
            res.status(500).send('Erro ao adicionar o artista.');
        }
    },

    async editarArtistaForm(req, res) {
        try {
            const { id } = req.params;
    
            const artista = await Artista.findByPk(id, {
                include: [{ model: Genero, as: 'generos' }], 
            });
    
            if (!artista) {
                return res.status(404).send('Artista não encontrado.');
            }
    
            const generos = await Genero.findAll();
    
            res.render('artistas/editar', { artista, generos });
        } catch (error) {
            console.error('Erro ao carregar o formulário de edição do artista:', error);
            res.status(500).send('Erro ao carregar o formulário de edição.');
        }
    },

    async editarArtista(req, res) {
        try {
            const { id } = req.params;
            const { nome, generoIds } = req.body;
    
            const artista = await Artista.findByPk(id);
            if (!artista) {
                return res.status(404).send('Artista não encontrado.');
            }
    
            await artista.update({ nome });
    
            if (generoIds) {
                const generoArray = Array.isArray(generoIds) ? generoIds : [generoIds];
                await artista.setGeneros(generoArray);
            }
    
            res.redirect(`/artistas/${id}`);
        } catch (error) {
            console.error('Erro ao editar o artista:', error);
            res.status(500).send('Erro ao editar o artista.');
        }
    },

    async excluirArtista(req, res) {
        try {
            const { id } = req.params;
    
            const artista = await Artista.findByPk(id);
    
            if (!artista) {
                return res.status(404).send('Artista não encontrado.');
            }
    
            await artista.destroy();
    
            res.redirect('/artistas');
        } catch (error) {
            console.error('Erro ao excluir o artista:', error);
            res.status(500).send('Erro ao excluir o artista.');
        }
    },

    async detalhesArtista(req, res) {
        try {
            const { id } = req.params;
    
            const artista = await Artista.findByPk(id, {
                include: [
                    { model: Genero, as: 'generos' }, 
                    { model: Disco, as: 'discos' },  
                ],
            });
    
            if (!artista) {
                return res.status(404).send('Artista não encontrado.');
            }
    
            res.render('artistas/detalhes', { artista });
        } catch (error) {
            console.error('Erro ao buscar detalhes do artista:', error);
            res.status(500).send('Erro ao buscar detalhes do artista.');
        }
    }
};