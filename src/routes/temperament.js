const express = require('express');
const temperametController = require('../controllers/temperamentController')
const routes = express.Router();

routes.post('/temperament',temperametController.store);


module.exports = routes;