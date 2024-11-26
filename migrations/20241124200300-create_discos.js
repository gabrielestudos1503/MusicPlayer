'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Discos', {
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
            data: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            capa: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            artistaId: { 
                type: Sequelize.INTEGER,
                references: {
                    model: 'Artistas',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL', 
                allowNull: true,
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
        await queryInterface.dropTable('Discos');
    },
};