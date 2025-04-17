const express = require('express');
const temperametController = require('../controllers/temperamentController')
const routes = express.Router();

routes.post('/temperament',temperametController.store);
routes.get('/temperament',temperametController.index);


module.exports = routes;