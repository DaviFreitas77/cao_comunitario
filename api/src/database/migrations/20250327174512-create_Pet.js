'use strict';
const { sequelize } = require('../../models/Pet');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.createTable('pets', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      namePet:{
        type:Sequelize.STRING,
        allowNull:false
      },
      aboutPet:{
        type:Sequelize.STRING,
        allowNull:false
      },
      typePet:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'typePet',
          key:'id'
        }
      },
      imagePet:{
        type:Sequelize.STRING,
        allowNull:false
      },
      genderPet:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'genderPets',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      agePet:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'agePet',
          key:'id'
        } 
      },
      onwerPet:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
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
