'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Faixas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            duracao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            discoId: { 
                type: Sequelize.INTEGER,
                references: {
                    model: 'Discos', 
                    key: 'id',
                },
                onUpdate: 'CASCADE', 
                onDelete: 'CASCADE',
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Faixas');
    },
};