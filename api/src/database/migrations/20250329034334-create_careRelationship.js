'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('careRelationship', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      fkCare: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CarePet',
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      fkPet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pets',
          key: 'id'
        },
        onDelete: "CASCADE"
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
