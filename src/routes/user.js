const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/auth');

router.get('/users',authMiddleware,userController.index);
router.post('/users',userController.store);
router.put('/users/:userId',userController.update);
router.delete('/users/:userId',userController.delete);
router.post('/login',userController.login);


module.exports = router;