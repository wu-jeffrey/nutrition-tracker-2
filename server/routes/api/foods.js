const express = require('express');
const router = express.Router();

// Models
const Food = require('../../db/models/Food');

// Returns all foods
// TODO: Use middleware and auth to only get a single user's foods
router.get('/', (req, res) => {
  Food.find()
    .sort({ date: -1 })
    .then(foods => res.json(foods));
});

router.post('/', (req, res) => {
  const newFood = new Food({
    name: req.body.name,
    calories: req.body.calories,
    protein: req.body.protein,
    carbohydrate: req.body.carbohydrate,
    fat: req.body.fat,
  });
    
  newFood.save().then(food => res.json(food));
});

router.delete('/:id', (req, res) => {
  Food.findById(req.params.id)
    .then(food => food.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json(err))
});

module.exports = router;