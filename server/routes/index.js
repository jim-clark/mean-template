module.exports = function (app) {

    /*
        Middleware to check for user token and if found,
        lookup user from db and attach to the request
    */
    app.use('/', require('./auth'));


    /*
        Main route which loads angular app.
        There are no other server routes, other than api's.
    */
    app.use('/', require('./main'));


    /*
        api routes
    */
    app.use('/login', require('./anom_user'));
    app.use('/user', require('./user'));
    app.use('/admin', require('./admin'));

};