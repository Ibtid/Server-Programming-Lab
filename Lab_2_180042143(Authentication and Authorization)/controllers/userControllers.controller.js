const User = require('../models/userModel.model');
const bcrypt = require('bcryptjs');
const alert = require('alert');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const getLoginPage = (req, res) => {
  res.sendFile('login.html', { root: './views/pages/examples' });
};

const getRegisterPage = (req, res) => {
  res.sendFile('register.html', { root: './views/pages/examples' });
};

const postRegister = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const retype = req.body.retype;

  try {
    const user = await User.findOne({ email });

    if (user) {
      alert('There is already an account under that email.');
      res.redirect('/login');
    } else if (password.length < 6) {
      alert('Password must be at least 6 characters');
      res.redirect('/register');
    } else if (password !== retype) {
      alert('Please enter the same password twice.');
      res.redirect('/register');
    } else if (!name || !email) {
      alert('Please fill the form.');
      res.redirect('/register');
    } else {
      const salt = await bcrypt.genSaltSync(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const createUser = new User({
        name,
        email,
        passwordHash,
      });
      await createUser.save();
      alert('Successfully created');
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
    res.redirect('/register');
  }
};

const postLogin = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const passMatch = await bcrypt.compare(pass, existingUser.passwordHash);
    if (passMatch) {
      localStorage.setItem('name', existingUser.name);
      res.redirect('/dashboard');
    } else {
      alert('Wrong Password');
      res.redirect('/login');
    }
  } else {
    alert('You are not registered\nPlease create an account');
    res.redirect('/register');
  }
};

module.exports = { getLoginPage, getRegisterPage, postRegister, postLogin };
