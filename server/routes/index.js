module.exports = function (app) {

  // main route
  app.use('/', require('./main'));

  // api routes
  app.use('/users', require('./users'));

};