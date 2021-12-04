const { jobs } = require('../sample-data')
exports.seed = function(knex) {
  
  return knex('jobs').insert(jobs);
};
