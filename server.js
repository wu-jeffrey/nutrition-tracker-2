const express = require('express');
const https = require('https');
const path = require('path');
const querystring = require('querystring');
const app = express();

// API routes
// TODO: Move to separate file
app.get('/api/nutritionix/foods/:query', (req, res) => {
  // TODO: figure out regex+replace to escape chars in query
  const query = req.params.query || '';
  const options = {
    hostname: 'trackapi.nutritionix.com',
    path: `/v2/search/instant?query=${query}`,
    method : 'GET',
    headers: {
      "x-app-id": "724ff2f9",
      "x-app-key": "278536e5231ffaa828d7e0ee0f64326c"
    }
  }

  const request = https.request(options, function(response){
    let body = ""
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

app.get('/api/nutritionix/food/:branded/:id', (req, res) => {
  const branded = req.params.branded === 'true'; // TODO: This is hacky
  const id = req.params.id || '';
  const path = branded ? `/v2/search/item?nix_item_id=${id}` : "/v2/natural/nutrients";
  const post_data = JSON.stringify({'query': id})

  const options = {
    hostname: 'trackapi.nutritionix.com',
    path: path,
    method : branded ? 'GET' : 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-app-id": "724ff2f9",
      "x-app-key": "278536e5231ffaa828d7e0ee0f64326c"
    }
  }

  const request = https.request(options, (response) => {
    let body = ""
    response.on('data', (data) => {
      body += data;
    });
    response.on('end', () => {
      res.send(JSON.parse(body));
    });
  });
  request.on('error', (e) => {
    console.log('Request Error: ' + e.message);
  });
  request.write(post_data);
  request.end();
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));