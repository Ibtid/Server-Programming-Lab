const getLoginPage = (req, res) => {
  res.sendFile('login.html', { root: './views/pages/examples' });
};

module.exports = { getLoginPage };
