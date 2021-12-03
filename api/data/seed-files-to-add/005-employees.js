const { employees } = require('../sample-data');
exports.seed = function(knex) {
  return knex('employees').insert(employees);
};
