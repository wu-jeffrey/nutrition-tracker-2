const express = require('express');
const path = require('path');
const app = express();

// API routes
app.get('/api/foods', (req, res) => {

});

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));