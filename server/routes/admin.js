var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET /admin/user/:user_id (returns a single user)
router.get('/user/:user_id', function(req, res) {
    res.json({ newUser: 'retrieved user' });
});

// POST /admin/user (creates a new user)
router.post('/user', function(req, res) {

//testing code below
console.log('POST /admin/user req.body: ' + req.body)

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    });
    user.save(function (err) {
    res.json(user);

    });

});

// PUT /admin/user/:user_id (updates a single user)
router.put('/user/:user_id', function(req, res) {
    res.json({ updatedUser: 'updated user' });
});

// DELETE /admin/user/:user_id (updates a single user)
router.delete('/user/:user_id', function(req, res) {
    res.json({ deletedUser: 'deleted user' });
});

module.exports = router;