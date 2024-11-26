'use strict';
module.exports = (sequelize, DataTypes) => {
    const Faixa = sequelize.define('Faixa', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duracao: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'Faixas',
    });

    Faixa.associate = function(models) {
        Faixa.belongsTo(models.Disco, {
            foreignKey: 'discoId',
            as: 'disco',
        });
    };

    return Faixa;
};