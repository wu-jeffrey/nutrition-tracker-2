const config = require('../../config/config');
const jwt = require('jsonwebtoken');

const jwtSecret = config.jwtSecret;

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if(!token) {
    res.status(401).json({ msg: 'No token, Authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch(err) {
    res.status(400).json({ msg: 'Invalid Token' });
  }
}

module.exports = auth;