const User = require('../models/userModel.model');

const getLoginPage = (req, res) => {
  res.sendFile('login.html', { root: './views/pages/examples' });
};

const getRegisterPage = (req, res) => {
  res.sendFile('register.html', { root: './views/pages/examples' });
};

const postRegister = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (password.length < 6) {
    return res.json({ message: 'Resgistration failed' });
  }
  res.json({ message: 'registration success' });
};

module.exports = { getLoginPage, getRegisterPage, postRegister };
