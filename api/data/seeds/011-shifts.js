const { shifts } = require('../sample-data');
exports.seed = function(knex) {
  return knex('shifts').insert(shifts);
};
