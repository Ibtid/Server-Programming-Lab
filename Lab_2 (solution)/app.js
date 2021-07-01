const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

//Routes
const indexRoutes = require('./routes/index.routes');
const userRoutes = require('./routes/users.routes');
app.use(indexRoutes);
app.use('/users', userRoutes);

module.exports = app;
