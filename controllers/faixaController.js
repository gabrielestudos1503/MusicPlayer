const { Faixa, Disco } = require('../models');

module.exports = {
    list: async (req, res) => {
        const discoId = req.params.discoId;
        const faixas = await Faixa.findAll({ where: { discoId } });
        res.render('faixas/list', { faixas, discoId });
    },

    createForm: async (req, res) => {
        const discoId = req.params.discoId;
        res.render('faixas/create', { discoId });
    },

    create: async (req, res) => {
        const { titulo, duracao } = req.body;
        const discoId = req.params.discoId;
        await Faixa.create({ titulo, duracao, discoId });
        res.redirect(`/discos/${discoId}`);
    },

    editForm: async (req, res) => {
        const faixa = await Faixa.findByPk(req.params.id);
        res.render('faixas/edit', { faixa });
    },

    edit: async (req, res) => {
        const { titulo, duracao } = req.body;
        await Faixa.update({ titulo, duracao }, { where: { id: req.params.id } });
        const faixa = await Faixa.findByPk(req.params.id);
        res.redirect(`/discos/${faixa.discoId}`);
    },

    delete: async (req, res) => {
        const faixa = await Faixa.findByPk(req.params.id);
        await Faixa.destroy({ where: { id: req.params.id } });
        res.redirect(`/discos/${faixa.discoId}`);
    },
};