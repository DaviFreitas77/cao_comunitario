

const ageController = require('../controllers/ageController');
const express = require('express');
const routes = express.Router();


routes.post('/agePet',ageController.store);



module.exports = routes;