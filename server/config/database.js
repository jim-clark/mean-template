var db_name = 'carf';

module.exports = {

  url: mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL ?
  process.env.OPENSHIFT_MONGODB_DB_URL + db_name : 'mongodb://127.0.0.1:27017/' + db_name

};