var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./server/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');
app.set('view options', { layout: false });

app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// setup passport
app.use(passport.initialize());
app.use(passport.session);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// below from http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/#.VOaLB1PF__w
// // passport config
// var Account = require('./models/account');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// // mongoose
// mongoose.connect('mongodb://localhost/passport_local_mongoose');

var db_name = 'carf';
//provide a sensible default for local development
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
var server = app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ":" + server_port )
});


module.exports = app;
