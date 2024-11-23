const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artista = sequelize.define('Artista', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Artista;