const getLoginPage = (req, res) => {
  res.sendFile('login.html', { root: './views/pages/examples' });
};

const getRegisterPage = (req, res) => {
  res.sendFile('register.html', { root: './views/pages/examples' });
};

module.exports = { getLoginPage, getRegisterPage };
