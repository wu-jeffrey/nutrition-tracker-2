const express = require('express');
const router = express.Router();

// Models
const Food = require('../../db/models/Food');

// Returns all foods
// TODO: Use middleware and auth to only get a single user's foods
router.get('/', (req, res, next) => {
  Food.find()
    .sort({ date: -1 })
    .then(foods => res.json(foods))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const newFood = new Food({
    name: req.body.name,
    calories: req.body.calories,
    protein: req.body.protein,
    carbohydrate: req.body.carbohydrate,
    fat: req.body.fat,
  });
    
  newFood.save()
    .then(food => res.json(food))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Food.findById(req.params.id)
    .then(food => food.remove().then(() => res.json({success: true})))
    .catch(next);
});

module.exports = router;