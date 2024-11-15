const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artista = sequelize.define(
    'Artista',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genero: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'Artista'
    }
);

Artista.associate = (models) => {
    Artista.belongsToMany(models.Disco, {through: 'DiscoArtista'});
    Artista.belongsToMany(models.Genero, {through: 'ArtistaGenero'});
};

module.exports = Artista;