module.exports = function (app) {

  // main route which loads angular app
  // no other server routes, other than api's
  app.use('/', require('./main'));

  // api routes
  app.use('/login', require('./anom_user'));
  app.use('/user', require('./user'));
  app.use('/admin', require('./admin'));

};