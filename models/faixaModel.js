const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Faixa = sequelize.define(
    'Faixa',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numeroFaixa: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Faixa'
    }
);

Faixa.associate = (models) => {
    Faixa.belongsTo(models.Disco);
};

module.exports = Faixa;