const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const jwtSecret = config.jwtSecret;

// Models
const User = require('../../db/models/User');

// @route POST api/users
// @desc Register a New User
// @access Public
router.post('/', (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) { return res.status(400).json({msg: 'Please enter all fields'}); }

  const newUser = new User({
    name,
    email,
    password
  });

  User.findOne({ email })
    .then(user => {
      if (user) { return res.status(400).json({msg: 'User already exists'}); }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) { throw err; }
          newUser.password = hash;

          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                jwtSecret,
                { expiresIn: 3600*24*7 },
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

module.exports = router;