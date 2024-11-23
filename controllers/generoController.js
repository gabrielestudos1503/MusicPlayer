const { Genero, Disco } = require('../models');

module.exports = {
    list: async (req, res) => {
        const generos = await Genero.findAll({ include: [Disco] });
        res.render('generos/list', { generos });
    },

    createForm: async (req, res) => {
        res.render('generos/create');
    },

    create: async (req, res) => {
        const { nome } = req.body;
        await Genero.create({ nome });
        res.redirect('/generos');
    },

    details: async (req, res) => {
        const genero = await Genero.findByPk(req.params.id, { include: [Disco] });
        res.render('generos/details', { genero });
    },

    editForm: async (req, res) => {
        const genero = await Genero.findByPk(req.params.id);
        res.render('generos/edit', { genero });
    },

    edit: async (req, res) => {
        const { nome } = req.body;
        await Genero.update({ nome }, { where: { id: req.params.id } });
        res.redirect('/generos');
    },

    delete: async (req, res) => {
        await Genero.destroy({ where: { id: req.params.id } });
        res.redirect('/generos');
    },
};