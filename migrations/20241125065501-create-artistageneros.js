'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ArtistaGeneros', {
            artistaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Artistas', // Nome da tabela `Artistas`
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            generoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Generos', // Nome da tabela `Generos`
                    key: 'id',
                },
                onDelete: 'CASCADE',
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
        await queryInterface.dropTable('ArtistaGeneros');
    },
};
