const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.routes');

const app = express();
app.use(cors());

app.use(userRoutes);

app.get('/', (req, res) => {
  res.sendFile('index3.html', { root: './views' });
});

module.exports = app;
