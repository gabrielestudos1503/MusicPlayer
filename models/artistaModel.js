'use strict';
module.exports = (sequelize, DataTypes) => {
    const Artista = sequelize.define('Artista', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'Artistas',
    });

    Artista.associate = function (models) {
        Artista.belongsToMany(models.Genero, {
            through: 'ArtistaGeneros', 
            as: 'generos',
            foreignKey: 'artistaId',
        });
    
        Artista.hasMany(models.Disco, {
            foreignKey: 'artistaId',
            as: 'discos',
        });
    };
    
    return Artista;
};