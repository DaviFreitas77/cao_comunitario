

const ageController = require('../controllers/ageController');
const authMiddleware = require('../middlewares/auth')
const express = require('express');
const routes = express.Router();


routes.post('/agePet',authMiddleware,ageController.store);
routes.get('/agePet',authMiddleware,ageController.index);



module.exports = routes;