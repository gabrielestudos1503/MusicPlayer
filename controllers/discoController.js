const { Disco, Artista, Genero, Faixa } = require('../models');
const upload = require('../config/multer');
const path = require('path');


module.exports = {
    list: async (req, res) => {
        const discos = await Disco.findAll({ include: [Artista, Genero] });
        res.render('discos/list', { discos });
    },
    createForm: async (req, res) => {
        const artistas = await Artista.findAll();
        const generos = await Genero.findAll();
        res.render('discos/create', { artistas, generos });
    },
    create: async (req, res) => {
        const { titulo, dataLanc, artistaId, generoId } = req.body;
        const capa = req.file ? `/uploads/capas/${req.file.filename}` : null;
        await Disco.create({ titulo, dataLanc, artistaId, generoId, capa });
        res.redirect('/discos');
    },
    details: async (req, res) => {
        const disco = await Disco.findByPk(req.params.id, { include: [Faixa, Artista, Genero] });
        res.render('discos/details', { disco });
    },
    editForm: async (req, res) => {
        const disco = await Disco.findByPk(req.params.id);
        const artistas = await Artista.findAll();
        const generos = await Genero.findAll();
        res.render('discos/edit', { disco, artistas, generos });
    },
    edit: async (req, res) => {
        const { titulo, dataLanc, artistaId, generoId } = req.body;
        const capa = req.file ? `/uploads/capas/${req.file.filename}` : null;
        await Disco.update({ titulo, dataLanc, artistaId, generoId, capa }, { where: { id: req.params.id } });
        res.redirect('/discos');
    },
    delete: async (req, res) => {
        await Disco.destroy({ where: { id: req.params.id } });
        res.redirect('/discos');
    },
};