const genderController = require('../controllers/genderPetController');
const express = require('express');
const routes = express.Router();

routes.post('/genderPet',genderController.store);
routes.get('/genderPet',genderController.index)


module.exports = routes;