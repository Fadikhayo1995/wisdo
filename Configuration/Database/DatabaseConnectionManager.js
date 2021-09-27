var pg = require('pg');
var environment = require('../Environment/AppEnv');

var pool;

var config = {
  host: environment.SQL_DB_HOST,
  user: environment.SQL_DB_USERNAME,
  database: environment.SQL_DB,
  password: environment.SQL_DB_PASSWORD,
  port: environment.SQL_DB_PORT,
  max: 20,
  idleTimeoutMillis: 0,
};

module.exports = {

  getPool: function () {
    if (pool) return pool;
    pool = new pg.Pool(config);
    return pool;
  }
};

