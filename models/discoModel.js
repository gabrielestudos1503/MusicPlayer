const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disco = sequelize.define(
    'Disco',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataLanc: {
            type: DataTypes.DATE,
            allowNull: false
        },
        capa: {
            type: DataTypes.STRING,
            allowNull: true
        },
        faixa: {
            type: DataTypes.JSONB,
            allowNull: true
        }
    }, {
        tableName: 'Disco'
    }
);

Disco.associate = (models) => {
    Disco.belongsToMany(models.Artista, {through: 'DiscoArtista'});
    Disco.belongsToMany(models.Genero, {through: 'DiscoGenero'});
    Disco.hasMany(models.Faixa);
};

module.exports = Disco;