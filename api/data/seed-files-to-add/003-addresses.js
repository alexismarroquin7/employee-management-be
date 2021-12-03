const { addresses } = require('../sample-data');
exports.seed = function(knex) {
  return knex('addresses').insert(addresses);
};
