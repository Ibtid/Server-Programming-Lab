const User = require('../models/userModel.model');
const bcrypt = require('bcryptjs');
const alert = require('alert');

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
      //res.redirect('/login');
      res.json({ message: 'failed' });
    } else if (password.length < 6) {
      alert('Password must be at least 6 characters');
      //res.redirect('/register');
      res.json({ message: 'failed' });
    } else if (password !== retype) {
      alert('Please enter the same password twice.');
      //res.redirect('/register');
      res.json({ message: 'failed' });
    } else if (!name || !email) {
      alert('Please fill the form.');
      //res.redirect('/register');
      res.json({ message: 'failed' });
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
      //res.redirect('/login');
      res.json({ message: 'success', createUser });
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
    res.redirect('/register');
  }
};

module.exports = { getLoginPage, getRegisterPage, postRegister };
