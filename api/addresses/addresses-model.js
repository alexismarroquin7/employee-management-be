const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('addresses as adr')
  return rows;
}

module.exports = {
  findAll
}