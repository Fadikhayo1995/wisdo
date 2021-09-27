var db = require('../../Configuration/Database/DatabaseConnectionManager');
var PgPool = db.getPool();
var AppEnv = require('../../Configuration/Environment/AppEnv');

module.exports = {
  runQuery: async function (query) {
    query = query.replace(/db_wisdo/g, AppEnv.SQL_SCHEMA);
    var client;
    try {
      client = await PgPool.connect();
      var queryResult = await client.query(query);
      client.release(true);
      client.end();
      return Promise.resolve(queryResult);
    } catch (err) {
      if (client) {
        client.release(true);
        client.end();
      }
      return Promise.reject(err);
    }
  }
};