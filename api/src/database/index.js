const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Pet = require('../models/Pet');
const typePet = require('../models/typePet');
const age = require('../models/AgePet');
const gender = require('../models/GenderPet');
const AgePet = require('../models/AgePet');
const CarePet = require('../models/CarePet')
const TemperamentPet = require('../models/TemperamentPet')
const temperamentRelationship = require('../models/TemperamentRelationship')
const CareRelationship = require('../models/CareRelationship')
const connection = new Sequelize(dbConfig);

User.init(connection)
Pet.init(connection)
typePet.init(connection)
age.init(connection)
gender.init(connection)
Pet.init(connection)
TemperamentPet.init(connection)
temperamentRelationship.init(connection)
CarePet.init(connection)
CareRelationship.init(connection)


Pet.associate(connection.models);
User.associate(connection.models)
typePet.associate(connection.models)
AgePet.associate(connection.models)
gender.associate(connection.models)
temperamentRelationship.associate(connection.models)
TemperamentPet.associate(connection.models)
CareRelationship.associate(connection.models)
CarePet.associate(connection.models)

module.exports = connection;