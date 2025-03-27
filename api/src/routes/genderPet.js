const genderController = require('../controllers/genderPetController');
const express = require('express');
const routes = express.Router();

routes.post('/genderPet',genderController.store);


module.exports = routes;