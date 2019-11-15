const express = require('express');
const https = require('https');
const path = require('path');
const app = express();

// API routes
// TODO: Move to separate file
app.get('/api/nutritionix/:query', (req, res) => {
  // TODO: use regex to escape chars in query
  let query = req.params.query || '';
  var options = {
    hostname: 'trackapi.nutritionix.com',
    path: `/v2/search/instant?query=${query}`,
    method : 'GET',
    headers: {
      "x-app-id": "ea96c6a3",
      "x-app-key": "6349b402aa732468a3cf1c258f7a6708"
    }
  }

  var request = https.request(options, function(response){
    var body = ""
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      res.send(JSON.parse(body));
    });
  });
  request.on('error', function(e) {
    console.log('Request Error: ' + e.message);
  });
  request.end();
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));