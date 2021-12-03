const { employee_contacts } = require('../sample-data');
exports.seed = function(knex) {
  return knex('employee_contacts').insert(employee_contacts);
};