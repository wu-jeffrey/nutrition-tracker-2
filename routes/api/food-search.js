const express = require('express');
const https = require('https');
const config = require('config');

const router = express.Router();

router.get('/foods/:query', (req, res, next) => {
  const query = encodeURI(req.params.query);
  const options = {
    hostname: 'trackapi.nutritionix.com',
    path: `/v2/search/instant?query=${query}`,
    method: 'GET',
    headers: {
      "x-app-id": process.env.nutritionixAppId || config.get('nutritionixAppId'),
      "x-app-key": process.env.nutritionixAppKey || config.get('nutritionixAppKey'),
    }
  }

  const request = https.request(options, (response) => {
    let body = ""
    response.on('data', (data) => {
      body += data;
    });
    response.on('end', () => {
      // Response contains contains multiple (2 of em AFAICT) arrays of common and branded foods
      // First map and flat squashes both arrays into a single one then second map remaps keys to camel case
      const result = JSON.parse(body.toString());
      const foods = Object.keys(result)
        .map((key) => result[key])
        .flat()
        .map((food) => {
          return {
            name: food.food_name,
            brandName: food.brand_name,
            nameWithBrand: food.brand_name_item_name,
            nixItemId: food.nix_item_id,
            tagId: food.tag_id,
            imageSrc: food.photo?.thumb,
            isBranded: (food.nixItemId !== undefined),
          };
        })

      res.send(foods);
    });
  });
  request.on('error', (e) => {
    next(e);
  });
  request.end();
});

router.get('/nutrition-facts/:branded/:id', (req, res, next) => {
  const branded = req.params.branded === 'true'; // TODO: This is hacky
  const id = req.params.id || '';
  const path = (branded) ? `/v2/search/item?nix_item_id=${encodeURI(id)}` : "/v2/natural/nutrients";
  const postData = JSON.stringify({ 'query': id });

  const options = {
    hostname: 'trackapi.nutritionix.com',
    path: path,
    method: branded ? 'GET' : 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-app-id": process.env.nutritionixAppId || config.get('nutritionixAppId'),
      "x-app-key": process.env.nutritionixAppKey || config.get('nutritionixAppKey'),
    }
  }

  const request = https.request(options, (response) => {
    let body = "";
    response.on('data', (data) => {
      body += data;
    });
    response.on('end', () => {
      const _food = JSON.parse(body.toString()).foods[0];

      const food = {
        name: _food.food_name,
        servingQty: _food.serving_qty,
        servingUnit: _food.serving_unit,
        servingWeightGrams: _food.serving_weight_grams,
        calories: _food.nf_calories,
        protein: _food.nf_protein,
        carbohydrate: _food.nf_total_carbohydrate,
        fat: _food.nf_total_fat,
      };

      res.send(food);
    });
  });
  request.on('error', (e) => {
    next(e);
  });
  request.write(postData);
  request.end();
});

module.exports = router;