'use strict';
module.exports = (sequelize, DataTypes) => {
    const Disco = sequelize.define('Disco', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        capa: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'Discos',
    });

    Disco.associate = function(models) {
        Disco.belongsTo(models.Artista, {
            foreignKey: 'artistaId',
            as: 'artista',
        });
        Disco.belongsToMany(models.Genero, {
            through: 'DiscoGeneros',
            as: 'generos',
            foreignKey: 'discoId',
        });
        Disco.hasMany(models.Faixa, {
            foreignKey: 'discoId',
            as: 'faixas',
        });
    };

    return Disco;
};