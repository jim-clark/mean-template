var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* api routes */
router.get('/api', function(req, res) {
  res.send('test api');
});

module.exports = router;
