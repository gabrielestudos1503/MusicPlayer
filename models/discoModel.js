const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disco = sequelize.define('Disco', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataLanc: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    capa: {
        type: DataTypes.STRING,
    },
});

module.exports = Disco;