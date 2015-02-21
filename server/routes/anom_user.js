var express = require('express');
var router = express.Router();

/*
    The anom_user route is assigned to the '/login' path.
    It is accessible to anonymous users so that they can login.
*/

// middleware that executes on every request to '/login'
router.use(function (req, res, next) {
  // validate email and password data

  next();
});

// POST /login
router.post('/', function(req, res) {
  res.json({ user: 'logged in user' });
});

module.exports = router;