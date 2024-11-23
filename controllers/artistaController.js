const { Artista, Disco, Genero } = require('../models');

module.exports = {
    list: async (req, res) => {
        const artistas = await Artista.findAll({ include: [Disco] });
        res.render('artistas/list', { artistas });
    },

    createForm: async (req, res) => {
        res.render('artistas/create');
    },

    create: async (req, res) => {
        const { nome } = req.body;
        await Artista.create({ nome });
        res.redirect('/artistas');
    },

    details: async (req, res) => {
        const artista = await Artista.findByPk(req.params.id, { include: [Disco] });
        res.render('artistas/details', { artista });
    },

    editForm: async (req, res) => {
        const artista = await Artista.findByPk(req.params.id);
        res.render('artistas/edit', { artista });
    },

    edit: async (req, res) => {
        const { nome } = req.body;
        await Artista.update({ nome }, { where: { id: req.params.id } });
        res.redirect('/artistas');
    },

    delete: async (req, res) => {
        await Artista.destroy({ where: { id: req.params.id } });
        res.redirect('/artistas');
    },
};