var express = require('express');
var router = express.Router();

/*
    The 'user' routes handle funtionality for a single user, such as,
    loggin out, updating their email & changing their password
*/

// middleware that executes on every request to '/user'
router.use(function (req, res, next) {
    // get logged in user

    next();
});


// POST /user/logout
router.post('/logout', function(req, res) {
  res.json({ message: 'logged out' });
});

module.exports = router;