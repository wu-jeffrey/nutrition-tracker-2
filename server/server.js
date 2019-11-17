const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();

// Middleware
app.use(bodyParser.json());

// DB Config
const db = config.mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`Error connecting to Mongo: ${err}`));

// API routes
app.use('/api/food-search/', require('./routes/api/food-search'));
app.use('/api/foods', require('./routes/api/foods'))

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));