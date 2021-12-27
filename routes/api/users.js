const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const jwtSecret = process.env.jwtSecret || config.get('jwtSecret');

// Models
const User = require('../../db/models/User');

// @route POST api/users
// @desc Register a New User
// @access Public
router.post('/', (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) { return res.status(400).json({ msg: 'Please enter all fields' }); }

  const newUser = new User({
    name,
    email,
    password
  });

  User.findOne({ email })
    .then(user => {
      if (user) { return res.status(400).json({ msg: 'User already exists' }); }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) { throw err; }
          newUser.password = hash;

          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                jwtSecret,
                { expiresIn: 3600 * 24 * 7 },
                (err, token) => {
                  if (err) { throw err; }

                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      daily_macro_goal: user.daily_macro_goal,
                    }
                  })
                }
              );
            });
        });
      });
    })
});

// @route     Get api/users
// @desc      Update User Daily Macro and Calorie Goal
// @access    Private
router.put('/daily-macro-goal', auth, async (req, res, next) => {
  try {
    const cal = req.body?.daily_macro_goal?.calories;
    const protein = req.body?.daily_macro_goal?.protein;
    const carbohydrate = req.body?.daily_macro_goal?.carbohydrate;
    const fat = req.body?.daily_macro_goal?.fat;
    console.log(Math.abs(cal - (protein * 4 + carbohydrate * 4 + fat * 9)))
    if (!cal || !protein || !carbohydrate || !fat) {
      // Check if any of the fields are missing
      throw "Incomplete request input";
    } else if (Math.abs(cal - (protein * 4 + carbohydrate * 4 + fat * 9)) > 10) {
      // Check that macros add up to calorie goal with tolerance of 10
      throw "Macronutrient breakdown doesn't add up to calories";
    } else {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          daily_macro_goal:
            { calories: cal, protein: protein, carbohydrate: carbohydrate, fat: fat }
        },
        { new: true })
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
