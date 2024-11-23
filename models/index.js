const sequelize = require('../config/database');
const Artista = require('./artistaModel');
const Disco = require('./discoModel');
const Genero = require('./generoModel');
const Faixa = require('./faixaModel');

Disco.belongsTo(Artista, { foreignKey: 'artistaId', onDelete: 'CASCADE' });
Disco.belongsTo(Genero, { foreignKey: 'generoId', onDelete: 'CASCADE' });
Disco.hasMany(Faixa, { foreignKey: 'discoId', onDelete: 'CASCADE' });

Artista.hasMany(Disco, { foreignKey: 'artistaId' });
Genero.hasMany(Disco, { foreignKey: 'generoId' });

Faixa.belongsTo(Disco, { foreignKey: 'discoId' });

module.exports = { sequelize, Artista, Disco, Genero, Faixa };