
const typePetController = require('../controllers/typePetController');
const express = require('express');
const routes = express.Router();

routes.post('/typePet',typePetController.store);


module.exports = routes;