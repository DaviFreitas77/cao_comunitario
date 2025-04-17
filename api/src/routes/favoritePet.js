const favoriteController = require('../controllers/favoriteController');
const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/auth');

routes.post('/favorite', authMiddleware, favoriteController.store);
routes.get('/favorite', authMiddleware, favoriteController.index);



module.exports = routes;