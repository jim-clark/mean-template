var express = require('express');
var router = express.Router();


// POST /admin
router.post('/', function(req, res) {
  res.send({ newuser: 'new user' });
});

module.exports = router;