const { job_addresses } = require('../sample-data');
exports.seed = function(knex) {
  return knex('job_addresses').insert(job_addresses);
};
