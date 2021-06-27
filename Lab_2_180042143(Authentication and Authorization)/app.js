const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/login', (req, res) => {
  res.send('login page');
});

app.get('/', (req, res) => {
  res.sendFile('index3.html', { root: './views' });
});

module.exports = app;
