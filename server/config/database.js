var mongoose = require('mongoose');
var constants = require('./constants');
var mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL ?
  process.env.OPENSHIFT_MONGODB_DB_URL + constants.DB_NAME : 'mongodb://127.0.0.1:27017/' + constants.DB_NAME;

mongoose.connect(mongodb_connection_string);

var con = mongoose.connection;
con.on('error', function (msg) {
    console.log(msg);
});
con.once('open', function () {
    console.log('db connection to %s was successful', mongodb_connection_string);
});

module.exports = mongoose;