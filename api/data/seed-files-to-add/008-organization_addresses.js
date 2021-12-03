const { organization_addresses } = require('../sample-data');
exports.seed = function(knex) {
  return knex('organization_addresses').insert(organization_addresses);
};
