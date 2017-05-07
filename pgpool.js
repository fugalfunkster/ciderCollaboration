'use strict';

const pg = require('pg');

const config = {
  max: 5,
  idleTimeoutMillis: 300000,
};

const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

module.exports.query = function (sql, values, callback) {
  return pool.query(sql, values, callback);
};
