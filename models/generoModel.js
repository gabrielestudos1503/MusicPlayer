'use strict';
module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define('Genero', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'Generos',
    });

    Genero.associate = function(models) {
        Genero.belongsToMany(models.Disco, {
            through: 'DiscoGeneros',
            as: 'discos',
            foreignKey: 'generoId',
        });
        Genero.belongsToMany(models.Artista, {
            through: 'ArtistaGeneros', 
            as: 'artistas',
            foreignKey: 'generoId',
        });
    };

    return Genero;
};