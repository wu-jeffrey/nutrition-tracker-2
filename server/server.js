const express = require('express');
const https = require('https');
const path = require('path');
const querystring = require('querystring');
const app = express();

// API routes
app.use('/api/food-search/', require('./routes/api/food-search'));

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));