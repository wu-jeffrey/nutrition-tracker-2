const express = require('express');
const https = require('https');
const path = require('path');
const app = express();

// API routes
// TODO: Move to separate file
app.get('/api/nutritionix/foods/:query', (req, res) => {
  // TODO: figure out regex+replace to escape chars in query
  let query = req.params.query || '';
  var options = {
    hostname: 'trackapi.nutritionix.com',
    path: `/v2/search/instant?query=${query}`,
    method : 'GET',
    headers: {
      "x-app-id": "724ff2f9",
      "x-app-key": "278536e5231ffaa828d7e0ee0f64326c"
    }
  }

  var request = https.request(options, function(response){
    var body = ""
    response.on('data', function(data) {
      // body += data;
    });
    response.on('end', function() {
      // res.send(JSON.parse(body));
    });
  });
  request.on('error', function(e) {
    console.log('Request Error: ' + e.message);
  });
  request.end();
});

app.get('/api/nutritionix/food/:branded/:id', (req, res) => {
  // TODO: Need better parameter validation, refactor ternary operators -- hard to read!
  let id = req.params.id || '';
  let path = req.params.branded ? `/v2/search/item?nix_item_id=${id}` : "/v2/natural/nutrients";
  
  var options = {
    hostname: 'trackapi.nutritionix.com',
    path: encodeURIComponent(path),
    method : req.params.branded ? 'GET' : 'POST',
    headers: req.params.branded ? {
      "x-app-id": "724ff2f9",
      "x-app-key": "278536e5231ffaa828d7e0ee0f64326c"
    } : {
      'content-type': 'application/json',
      "x-app-id": "724ff2f9",
      "x-app-key": "278536e5231ffaa828d7e0ee0f64326c"
    },
    body: req.params.branded ? {} : {
      "query": id,
      "timezone": "US/Eastern"
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