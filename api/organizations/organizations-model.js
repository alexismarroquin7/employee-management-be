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

const findById = async (organization_id) => {
  const row = await db('organizations as org')
  .select(
    'org.organization_id',
    'org.organization_name as name',
    'org.organization_description as description',
    'org.created_at',
    'org.modified_at'
  )
  .where({ organization_id })
  .first();
  return row;
}

const create = async (newOrganization) => {

  const [organization] = await db('organizations as org').insert({
    organization_name: newOrganization.name,
    organization_description: newOrganization.description
  },
  [
    'org.organization_id',
    'org.organization_name as name',
    'org.organization_description as description',
    'org.created_at',
    'org.modified_at'
  ])
  
  return organization;
}

module.exports = {
  findAll,
  findById,
  create
}