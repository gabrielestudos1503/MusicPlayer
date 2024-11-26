const { Faixa, Disco } = require('../models');

module.exports = {
    
    async listFaixas(req, res) {
        try {
            const { discoId } = req.params;
            const disco = await Disco.findByPk(discoId, {
                include: { model: Faixa, as: 'faixas' },
            });

            if (!disco) return res.status(404).send('Disco não encontrado.');

            res.render('faixas/listar', { faixas: disco.faixas, disco });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao listar as faixas.');
        }
    },

    async addFaixa(req, res) {
        try {
            const { discoId } = req.params;
            const { titulo, duracao } = req.body;

            const disco = await Disco.findByPk(discoId);
            if (!disco) return res.status(404).send('Disco não encontrado.');

            await Faixa.create({ titulo, duracao, discoId });
            res.redirect(`/faixas/${discoId}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao adicionar a faixa.');
        }
    },

    async editFaixaForm(req, res) {
        try {
            const { id } = req.params;
            const faixa = await Faixa.findByPk(id);

            if (!faixa) return res.status(404).send('Faixa não encontrada.');

            res.render('faixas/editar', { faixa });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao carregar o formulário de edição.');
        }
    },

    async editFaixa(req, res) {
        try {
            const { id } = req.params;
            const { titulo, duracao } = req.body;

            const faixa = await Faixa.findByPk(id);
            if (!faixa) return res.status(404).send('Faixa não encontrada.');

            await faixa.update({ titulo, duracao });
            res.redirect(`/faixas/${faixa.discoId}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao editar a faixa.');
        }
    },

    async deleteFaixa(req, res) {
        try {
            const { id } = req.params;

            const faixa = await Faixa.findByPk(id);
            if (!faixa) return res.status(404).send('Faixa não encontrada.');

            const discoId = faixa.discoId;
            await faixa.destroy();
            res.redirect(`/faixas/${discoId}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao excluir a faixa.');
        }
    },
};