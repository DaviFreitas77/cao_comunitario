'use strict';

const { sequelize } = require('../../models/User');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      number:{
        type:Sequelize.STRING,
        allowNull:false
      },
      image:{
        type:Sequelize.STRING,
        allowNull:false
      }
    });

  },

  async down(queryInterface, Sequelize) {

    return queryInterface.dropTable('users');

  }
};
