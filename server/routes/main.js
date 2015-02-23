var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function(req, res, next) {

// DEBUG
console.log(req.user)

  res.render('index', { title: 'CARF', user: JSON.stringify(req.user) });
});

module.exports = router;
