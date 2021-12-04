const { shifts_worked } = require('../sample-data')

exports.seed = function(knex) {
  return knex('shifts_worked').insert(shifts_worked);
};
