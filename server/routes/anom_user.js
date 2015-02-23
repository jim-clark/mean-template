var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var oneWeek = 60000 * 60 * 24 * 7;

/*
    The anom_user route is assigned to the '/login' path.
    It is accessible to anonymous users so that they can login, thus no middleware...
*/

// POST /login
router.post('/', function(req, res) {
    // find the user by email
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            res.clearCookie('carf-token');
            res.json({
                success: false,
                message: 'Invalid email and/or password'  // keep 'em guessing :)
            });
        } else if (!user.isActive) {
            res.clearCookie('carf-token');
            res.json({
                success: false,
                message: 'The account of ' + req.body.email + ' is account is inactive'
            });
        } else {
            // verify hash of password matches password in db
            if (user.verifyPassword(req.body.password)) {
                //  generate unique token and set it in cookie and user
                crypto.randomBytes(48, function (ex, buf) {
                    var token = buf.toString('hex');
                    user.token = token;
                    user.save(function (err) {
                        res.cookie('carf-token', token, { maxAge: oneWeek });
                        res.json({
                            success: true,
                            user: user.toJSON()
                        });
                    });
                });
            } else {
                res.clearCookie('carf-token');
                res.json({
                    success: false,
                    message: 'Invalid email and/or password'  // keep 'em guessing :)
                });
            }
        }
    });

});

module.exports = router;