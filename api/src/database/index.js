const Sequelize  = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Pet = require('../models/Pet');
const typePet = require('../models/typePet');
const age = require('../models/AgePet');
const gender = require('../models/GenderPet');

const connection  = new Sequelize(dbConfig);

User.init(connection)
Pet.init(connection)
typePet.init(connection)
age.init(connection)
gender.init(connection)

module.exports = connection;