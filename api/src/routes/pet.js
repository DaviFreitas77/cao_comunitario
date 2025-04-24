

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const petController = require('../controllers/petController')

router.get('/pets',authMiddleware,petController.index);
router.post('/pets',authMiddleware,petController.store);
router.get('/pets/:id',authMiddleware,petController.getPetId);
router.get('/myPets',authMiddleware,petController.myPet)



module.exports = router;