var express = require('express');
var router = express.Router();
var User = require('../models/user');

/*
    Middleware to check for user token and if found,
    lookup user from db and attach to the request
*/

// GET '/'
router.get('/', function(req, res, next) {
    var token = req.cookies['carf-token'];

    if (token) {        
        User.findOne({ token: token }, function (err, user) {
            req.user = user.toJSON();
            next();
        });
    } else {
        req.user = null;
        next();
    }

});

module.exports = router;
