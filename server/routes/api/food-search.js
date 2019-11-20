const express = require('express');
const https = require('https');
const config = require('../../config/config');

const router = express.Router();

router.get('/foods/:query', (req, res, next) => {
  const query = encodeURI(req.params.query);
  const options = {
    hostname: 'trackapi.nutritionix.com',
    path: `/v2/search/instant?query=${query}`,
    method : 'GET',
    headers: {
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
      res.send(body);
    });
  });
  request.on('error', (e) => {
    console.log('Request Error: ' + e.message);
    next(e);
  });
  request.end();
});

router.get('/nutrition-facts/:branded/:id', (req, res, next) => {
  const branded = req.params.branded === 'true'; // TODO: This is hacky
  const id = req.params.id || '';
  const path = (branded) ? `/v2/search/item?nix_item_id=${encodeURI(id)}` : "/v2/natural/nutrients";
  const postData = JSON.stringify({'query': id});

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
    let body = "";
    response.on('data', (data) => {
      body += data;
    });
    response.on('end', () => {
      res.send(body);
    });
  });
  request.on('error', (e) => {
    console.log('Request Error: ' + e.message);
    next(e);
  });
  request.write(postData);
  request.end();
});

module.exports = router;