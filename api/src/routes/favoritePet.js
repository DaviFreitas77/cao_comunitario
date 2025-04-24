const favoriteController = require('../controllers/favoriteController');
const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/auth');

routes.post('/favorite', authMiddleware, favoriteController.store);
routes.get('/favorite', authMiddleware, favoriteController.index);
routes.get('/favorite/:idPet', authMiddleware, favoriteController.verifyFavorite);
routes.delete('/favorite/:idPet', authMiddleware, favoriteController.deletedFavorite)




module.exports = routes;