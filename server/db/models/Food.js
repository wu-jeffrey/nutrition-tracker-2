const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    default: 0,
    required: true,
  },
  protein: {
    type: Number,
    default: 0,
  },
  carbohydrate: {
    type: Number,
    default: 0,
  },
  fat: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = Food = mongoose.model('food', FoodSchema);