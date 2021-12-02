const { organizations } = require('../sample-data');
exports.seed = function(knex) {
  return knex('organizations').insert(organizations);
};
