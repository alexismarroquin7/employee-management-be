const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('roles as r');
  return rows
}

const findById = async (role_id) => {
  const rows = await db('roles as r')
  .where({ role_id })
  .first();
  return rows
}

const findBy = async (filter) => {
  const rows = await db('roles as r')
  .where(filter);
  return rows
}

const create = async ({
  name,
  description
}) => {
  const row = await db('roles as r').insert({
    role_name: name,
    role_description: description
  }, ['r.*']);
  return row;
}

module.exports = {
  findAll,
  findById,
  findBy,
  create
}