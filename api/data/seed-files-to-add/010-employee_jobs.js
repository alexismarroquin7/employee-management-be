const { employee_jobs } = require('../sample-data');
exports.seed = function(knex) {
  return knex('employee_jobs').insert(employee_jobs);
};
