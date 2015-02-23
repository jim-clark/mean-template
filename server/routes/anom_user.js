var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');


/*
    The anom_user route is assigned to the '/login' path.
    It is accessible to anonymous users so that they can login, thus no middleware...
*/

// POST /login
router.post('/', function(req, res) {
    // find the user by email
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
            res.json({
                success: false,
                message: 'Invalid email and/or password'  // keep 'em guessing :)
            });
        } else if (!user.isActive) {
            res.json({
                success: false,
                message: 'The account of ' + req.body.email + ' is account is inactive'
            });
        } else {
            // verify hash of password matches password in db
            if (user.verifyPassword(req.body.password)) {
                res.json({
                    success: true,
                    user: user.toJSON()
                });
            } else {
                res.json({
                    success: false,
                    message: 'Invalid email and/or password'  // keep 'em guessing :)
                });
            }
        }
    });

});

module.exports = router;