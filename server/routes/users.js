var express = require('express');
var router = express.Router();

// GET /users
router.get('/', function(req, res) {
  res.send({ username: 'test username' });
});

// POST /users
router.post('/', function(req, res) {
  res.send({ newuser: 'new user' });
});

module.exports = router;