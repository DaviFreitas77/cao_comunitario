'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('temperamentRelationship',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },
      fkTemperament:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'TemperamentPet',
          key:'id'
        },
        onDelete:"CASCADE"
      },
      fkPet:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Pets',
          key:'id'
        },
        onDelete:"CASCADE"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
