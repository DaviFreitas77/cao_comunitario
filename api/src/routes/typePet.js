
const typePetController = require('../controllers/typePetController');
const express = require('express');
const routes = express.Router();

routes.post('/typePet',typePetController.store);
routes.get('/typePet',typePetController.index)

module.exports = routes;