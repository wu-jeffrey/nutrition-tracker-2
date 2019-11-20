const express = require('express');
const bodyParser = require('body-parser');
const httpErrorHanlder = require('./middleware/http-error-handler')
const app = express();

// Middleware
app.use(bodyParser.json());

// API routes
app.use('/api/food-search/', require('./routes/api/food-search'));
app.use('/api/foods', require('./routes/api/foods'))

// Error Handling Middleware
app.use(httpErrorHanlder);

module.exports = app;