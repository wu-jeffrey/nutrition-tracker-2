const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const auth = require('../../middleware/auth');

const jwtSecret = config.jwtSecret;


// Models
const User = require('../../db/models/User');

// @route POST api/auth/
// @desc Authenticate a User
// @access Public
router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) { return res.status(400).json({msg: 'Please enter all fields'}); }

  User.findOne({ email })
    .then(user => {
      if (!user) { return res.status(400).json({msg: 'User does not exists'}); }

      // Validate Password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) { return res.status(400).json({ msg: 'Invalid Credentials'}); }
          
          jwt.sign(
            { id: user.id },
            jwtSecret,
            { expiresIn: 3600*24*7 },
            (err, token) => {
              if (err) {
                throw err;
              }
              
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
        })
    })
});

// @route     Get api/auth/user
// @desc      Get User data
// @access    Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});


module.exports = router;