const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genero = sequelize.define(
    'Genero', 
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Genero'
    }
);

Genero.associate = (models) => {
    Genero.belongsToMany(models.Disco, {through: 'DiscoGenero' });
    Genero.belongsToMany(models.Artista, {through: 'ArtistaGenero' });
};
 
module.exports = Genero;