const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('organizations as org')
  .select(
    'org.organization_id',
    'org.organization_name as name',
    'org.organization_description as description',
    'org.created_at',
    'org.modified_at'
  )
  return rows;
}

module.exports = {
  findAll
}