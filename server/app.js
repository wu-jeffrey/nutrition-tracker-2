const express = require('express');
const httpErrorHanlder = require('./middleware/http-error-handler')
const app = express();

// Middleware
app.use(express.json());

// API routes
app.use('/api/food-search/', require('./routes/api/food-search'));
app.use('/api/foods', require('./routes/api/foods'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Error Handling Middleware
app.use(httpErrorHanlder);

module.exports = app;