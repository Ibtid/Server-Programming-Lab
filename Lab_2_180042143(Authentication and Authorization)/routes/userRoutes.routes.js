const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers.controller');
const isLoggedIn = require('../middlewares/auth.middleware');

router.get('/login', userController.getLoginPage);
router.get('/register', userController.getRegisterPage);
router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/dashboard', isLoggedIn, userController.getDashboard);

module.exports = router;
