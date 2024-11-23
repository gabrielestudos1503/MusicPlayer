const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genero = sequelize.define('Genero', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Genero;