const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  daily_macro_goal: {
    calories: {type: Number, default: 2600},
    protein: {type: Number, default: 215},
    carbohydrate: {type: Number, default: 300},
    fat: {type: Number, default: 60},
  }
});

module.exports = User = mongoose.model('user', UserSchema);