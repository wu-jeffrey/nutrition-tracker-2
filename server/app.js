const express = require('express');
const httpErrorHanlder = require('./middleware/http-error-handler')
const app = express();
const path = require('path');

// Middleware
app.use(express.json());

// API routes
app.use('/api/food-search/', require('./routes/api/food-search'));
app.use('/api/foods', require('./routes/api/foods'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Error Handling Middleware
app.use(httpErrorHanlder);

module.exports = app;