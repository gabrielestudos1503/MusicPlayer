const { Genero, Artista, Disco, Sequelize } = require('../models');

module.exports = {

    async getRecentGeneros(req, res) {
        try {
            const generos = await Genero.findAll({
                limit: 3,
                order: [['createdAt', 'DESC']],
            });
            return generos;
        } catch (error) {
            console.error('Erro ao buscar gêneros recentes:', error);
            throw error;
        }
    },
    
    async  listarGeneros(req, res) {
        try {
            const { nome } = req.query;
    
            const where = {};
            if (nome) {
                // Adiciona um filtro pelo nome do gênero
                where.nome = { [Sequelize.Op.iLike]: `%${nome}%` };
            }
    
            const generos = await Genero.findAll({ where });
            res.render('generos/listar', { generos }); // Renderiza a página de lista com os gêneros encontrados
        } catch (error) {
            console.error('Erro ao listar os gêneros:', error);
            res.status(500).send('Erro ao listar os gêneros.');
        }
    },

    async adicionarGeneroForm(req, res) {
        res.render('generos/adicionar');
    },

    async adicionarGenero(req, res) {
        try {
            const { nome } = req.body;
    
            // Cria o gênero
            await Genero.create({ nome });
    
            res.redirect('/generos');
        } catch (error) {
            console.error('Erro ao adicionar o gênero:', error);
            res.status(500).send('Erro ao adicionar o gênero.');
        }
    },

    async editarGeneroForm(req, res) {
        try {
            const { id } = req.params;
    
            // Busca o gênero pelo ID
            const genero = await Genero.findByPk(id);
    
            if (!genero) {
                return res.status(404).send('Gênero não encontrado.');
            }
    
            res.render('generos/editar', { genero });
        } catch (error) {
            console.error('Erro ao carregar o formulário de edição:', error);
            res.status(500).send('Erro ao carregar o formulário de edição.');
        }
    },

    async editarGenero(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
    
            // Busca o gênero para edição
            const genero = await Genero.findByPk(id);
    
            if (!genero) {
                return res.status(404).send('Gênero não encontrado.');
            }
    
            // Atualiza o nome do gênero
            await genero.update({ nome });
    
            res.redirect(`/generos/${id}`);
        } catch (error) {
            console.error('Erro ao editar o gênero:', error);
            res.status(500).send('Erro ao editar o gênero.');
        }
    },

    async deleteGenero(req, res) {
        try {
            const { id } = req.params;

            const genero = await Genero.findByPk(id);
            if (!genero) {
                return res.status(404).send('Gênero não encontrado.');
            }

            await genero.destroy();
            res.redirect('/generos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao excluir o gênero.');
        }
    },

    async detalhesGenero(req, res) {
        try {
            const { id } = req.params;
    
            // Buscar o gênero pelo ID, incluindo artistas e discos associados
            const genero = await Genero.findByPk(id, {
                include: [
                    { model: Artista, as: 'artistas' },
                    { model: Disco, as: 'discos' },
                ],
            });
    
            if (!genero) {
                return res.status(404).send('Gênero não encontrado.');
            }
    
            res.render('generos/detalhes', { genero });
        } catch (error) {
            console.error('Erro ao buscar detalhes do gênero:', error);
            res.status(500).send('Erro ao buscar detalhes do gênero.');
        }
    }
};