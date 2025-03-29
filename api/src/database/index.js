const Sequelize  = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Pet = require('../models/Pet');
const typePet = require('../models/typePet');
const age = require('../models/AgePet');
const gender = require('../models/GenderPet');
const pet = require('../models/Pet');
const AgePet = require('../models/AgePet');
const connection  = new Sequelize(dbConfig);

User.init(connection)
Pet.init(connection)
typePet.init(connection)
age.init(connection)
gender.init(connection)
pet.init(connection)

Pet.associate(connection.models);
User.associate(connection.models)
typePet.associate(connection.models)
AgePet.associate(connection.models)
gender.associate(connection.models)

module.exports = connection;