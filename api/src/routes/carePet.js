const express = require('express');
const careController = require('../controllers/careController')
const routes = express.Router();

routes.post('/care',careController.store)
routes.get('/care',careController.index)

module.exports = routes;