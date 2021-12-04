const { departments } = require('../sample-data')
exports.seed = function(knex) {
  return knex('departments').insert(departments);
};
