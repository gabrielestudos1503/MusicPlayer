const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Faixa = sequelize.define('Faixa', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duracao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Faixa;