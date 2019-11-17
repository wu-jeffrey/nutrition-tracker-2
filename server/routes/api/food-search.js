const express = require('express');
const https = require('https');
const config = require('../../config/config');

const router = express.Router();

router.get('/foods/:query', (req, res) => {
  // TODO: figure out regex+replace to escape chars in query
  const query = req.params.query || '';
  const options = {
    hostname: 'trackapi.nutritionix.com',
    path: `/v2/search/instant?query=${query}`,
    method : 'GET',
    headers: {
      "x-app-id": config.nutritionixAppId,
      "x-app-key": config.nutritionixAppKey,
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

router.get('/nutrition-facts/:branded/:id', (req, res) => {
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
      "x-app-id": config.nutritionixAppId,
      "x-app-key": config.nutritionixAppKey,
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

module.exports = router;