const { Disco, Artista, Genero, Faixa, Sequelize } = require('../models');

module.exports = {
    
    async getRecentDiscos(req, res) {
        try {
            const discos = await Disco.findAll({
                limit: 3,
                order: [['createdAt', 'DESC']],
            });
            return discos;
        } catch (error) {
            console.error('Erro ao buscar discos recentes:', error);
            throw error;
        }
    },

    async listarDiscos(req, res) {
        try {
            const discos = await Disco.findAll({
                include: [
                    { model: Artista, as: 'artista' },
                    { model: Genero, as: 'generos' },
                    { model: Faixa, as: 'faixas' },
                ],
            });
            res.render('discos/listar', { discos });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao listar os discos.');
        }
    },

    async adicionarDiscoForm(req, res) {
        try {
            const artistas = await Artista.findAll();
            const generos = await Genero.findAll();
            res.render('discos/adicionar', { artistas, generos });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao carregar o formulário de adição.');
        }
    },

    async adicionarDisco(req, res) {
        try {
            const { titulo, data, artistaId, generoIds, faixas } = req.body;
    
            const capa = req.file ? `/uploads/${req.file.filename}` : null;
            console.log('Arquivo enviado:', req.file);

            const disco = await Disco.create({
                titulo,
                data,
                capa,
                artistaId,
            });
    
            if (generoIds) {
                await disco.setGeneros(generoIds);
            }
    
            if (faixas) {
                const faixasArray = Array.isArray(faixas) ? faixas : [faixas];
                for (const faixa of faixasArray) {
                    const faixaObj = JSON.parse(faixa); 
                    await Faixa.create({
                        titulo: faixaObj.titulo,
                        duracao: faixaObj.duracao,
                        discoId: disco.id,
                    });
                }
            }
    
            res.redirect('/discos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao adicionar o disco.');
        }
    },

    async buscarDiscos(req, res) {
        try {
            const { titulo, artista, genero } = req.query;
    
            const where = {};
            if (titulo) where.titulo = { [Sequelize.Op.iLike]: `%${titulo}%` };
            if (artista) where['$artista.nome$'] = { [Sequelize.Op.iLike]: `%${artista}%` };
            if (genero) where['$generos.nome$'] = { [Sequelize.Op.iLike]: `%${genero}%` };
    
            const discos = await Disco.findAll({
                where,
                include: [
                    { model: Artista, as: 'artista' },
                    { model: Genero, as: 'generos' },
                ],
            });
    
            res.render('discos/listar', { discos });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao buscar os discos.');
        }
    },

    async editarDiscoForm(req, res) {
        try {
            const { id } = req.params;
    
            const disco = await Disco.findByPk(id, {
                include: [
                    { model: Artista, as: 'artista' },
                    { model: Genero, as: 'generos' },
                    { model: Faixa, as: 'faixas' },
                ],
            });
    
            if (!disco) {
                return res.status(404).send('Disco não encontrado.');
            }
    
            const artistas = await Artista.findAll();
            const generos = await Genero.findAll();
    
            res.render('discos/editar', { disco, artistas, generos });
        } catch (error) {
            console.error('Erro ao carregar o formulário de edição:', error);
            res.status(500).send('Erro ao carregar o formulário de edição.');
        }
    },

    async editarDisco(req, res) {
        try {
            const { id } = req.params;
            const { titulo, data, artistaId, generoIds, faixas } = req.body;
    
            const disco = await Disco.findByPk(id);
            if (!disco) {
                return res.status(404).send('Disco não encontrado.');
            }
    
            const capa = req.file ? `/uploads/${req.file.filename}` : disco.capa;
    
            await disco.update({
                titulo,
                data,
                capa,
                artistaId,
            });
    
            if (generoIds) {
                const generoArray = Array.isArray(generoIds) ? generoIds : [generoIds];
                await disco.setGeneros(generoArray);
            }
    
            if (faixas) {
                const faixasArray = Array.isArray(faixas) ? faixas : [faixas];
                await Faixa.destroy({ where: { discoId: id } });
                for (const faixa of faixasArray) {
                    const faixaObj = JSON.parse(faixa);
                    await Faixa.create({
                        titulo: faixaObj.titulo,
                        duracao: faixaObj.duracao || null,
                        discoId: id,
                    });
                }
            }
    
            res.redirect(`/discos/${id}`);
        } catch (error) {
            console.error('Erro ao editar o disco:', error);
            res.status(500).send('Erro ao editar o disco.');
        }
    },

    async deletarDisco(req, res) {
        try {
            const { id } = req.params;

            const disco = await Disco.findByPk(id);
            if (!disco) return res.status(404).send('Disco não encontrado.');

            await disco.destroy();
            res.redirect('/discos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao excluir o disco.');
        }
    },

    async detalhesDisco(req, res) {
        try {
            const { id } = req.params;
    
            const disco = await Disco.findByPk(id, {
                include: [
                    { model: Artista, as: 'artista' },
                    { model: Genero, as: 'generos' },
                    { model: Faixa, as: 'faixas' },
                ],
            });
    
            if (!disco) {
                return res.status(404).send('Disco não encontrado.');
            }
    
            res.render('discos/detalhes', { disco });
        } catch (error) {
            console.error('Erro ao buscar detalhes do disco:', error);
            res.status(500).send('Erro ao buscar detalhes do disco.');
        }
    },
};