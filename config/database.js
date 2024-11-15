const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MusicPlayer', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;