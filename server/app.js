const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Middleware
app.use(bodyParser.json());

// API routes
app.use('/api/food-search/', require('./routes/api/food-search'));
app.use('/api/foods', require('./routes/api/foods'))

module.exports = app;