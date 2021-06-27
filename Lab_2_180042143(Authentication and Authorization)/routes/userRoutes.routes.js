const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers.controller');

router.get('/login', userController.getLoginPage);

module.exports = router;
