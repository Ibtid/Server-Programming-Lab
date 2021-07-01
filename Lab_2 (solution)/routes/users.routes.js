const express = require('express');
const router = express.Router();
const {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
} = require('../controllers/user.controller');

router.post('/login', postLogin);
router.get('/login', getLogin);
router.post('/register', postRegister);
router.get('/register', getRegister);

module.exports = router;
