const { employee_addresses } = require('../sample-data');
exports.seed = function(knex) {
  return knex('employee_addresses').insert(employee_addresses);
};
