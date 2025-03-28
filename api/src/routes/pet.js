

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const petController = require('../controllers/petController')

router.get('/pets',authMiddleware,petController.index);
router.post('/pets',authMiddleware,petController.store);


module.exports = router;