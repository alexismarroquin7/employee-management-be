const db = require('../data/db-config');
const Employee = require('../employees/employees-model')

const findAll = async () => {
  const rows = await db('organization_invites_sent as org_inv_sent')
  .join('organization_invites as org_inv', 'org_inv_sent.organization_invite_id', 'org_inv.organization_invite_id')
  .join('organizations as org', 'org.organization_id', 'org_inv.organization_id')
  .select(
    'org_inv_sent.organization_invite_sent_id',
    'org_inv_sent.status',
    'org_inv_sent.user_id as sent_by_user_id',
    'org_inv_sent.created_at as organization_invite_sent_created_at',
    'org_inv_sent.modified_at as organization_invite_sent_modified_at',
    
    'org_inv.organization_invite_id',
    'org_inv.user_id as sent_to_user_id',
    'org_inv.message',
    'org_inv.organization_id',
    'org_inv.created_at  as organization_invite_created_at',
    'org_inv.modified_at as organization_invite_modified_at',

    'org_inv.organization_id',
    'org.organization_name',
    'org.organization_description',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at'

  )
  .orderBy('org_inv_sent.organization_invite_sent_id', 'asc')
  const organization_invites_sent = rows.map(row => {
    return {
      organization_invite_sent_id: row.organization_invite_sent_id,
      status: row.status,
      sent_by_user_id: row.sent_by_user_id,
      created_at: row.organization_invite_sent_created_at,
      modified_at: row.organization_invite_sent_modified_at,
      
      organization_invite: {
        organization_invite_id: row.organization_invite_id,
        sent_to_user_id: row.sent_to_user_id,
        message: row.message,
        organization_id: row.organization_id,
        created_at: row.organization_invite_created_at,
        modified_at: row.organization_invite_modified_at
      },

      organization: {
        organization_id: row.organization_id,
        name: row.organization_name,
        description: row.organization_description,
        created_at: row.organization_created_at,
        modified_at: row.organization_modified_at,
      }
    }
  })
  return organization_invites_sent;
};

const findBy = async (filter) => {
  const rows = await db('organization_invites_sent as org_inv_sent')
  .join('organization_invites as org_inv', 'org_inv_sent.organization_invite_id', 'org_inv.organization_invite_id')
  .join('organizations as org', 'org.organization_id', 'org_inv.organization_id')
  .select(
    'org_inv_sent.organization_invite_sent_id',
    'org_inv_sent.status',
    'org_inv_sent.user_id as sent_by_user_id',
    'org_inv_sent.created_at as organization_invite_sent_created_at',
    'org_inv_sent.modified_at as organization_invite_sent_modified_at',
    
    'org_inv.organization_invite_id',
    'org_inv.user_id as sent_to_user_id',
    'org_inv.message',
    'org_inv.organization_id',
    'org_inv.created_at  as organization_invite_created_at',
    'org_inv.modified_at as organization_invite_modified_at',

    'org_inv.organization_id',
    'org.organization_name',
    'org.organization_description',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at'
  )
  .where(filter)
  .orderBy('org_inv_sent.organization_invite_sent_id', 'asc')

  const organization_invites_sent = rows.map(row => {
    return {
      organization_invite_sent_id: row.organization_invite_sent_id,
      status: row.status,
      sent_by_user_id: row.sent_by_user_id,
      created_at: row.organization_invite_sent_created_at,
      modified_at: row.organization_invite_sent_modified_at,
      
      organization_invite: {
        organization_invite_id: row.organization_invite_id,
        sent_to_user_id: row.sent_to_user_id,
        message: row.message,
        organization_id: row.organization_id,
        created_at: row.organization_invite_created_at,
        modified_at: row.organization_invite_modified_at
      },

      organization: {
        organization_id: row.organization_id,
        name: row.organization_name,
        description: row.organization_description,
        created_at: row.organization_created_at,
        modified_at: row.organization_modified_at,
      }
    }
  })
  return organization_invites_sent;
};

const findById = async (organization_invite_sent_id) => {
  const row = await db('organization_invites_sent as org_inv_sent')
  .join('organization_invites as org_inv', 'org_inv_sent.organization_invite_id', 'org_inv.organization_invite_id')
  .join('organizations as org', 'org.organization_id', 'org_inv.organization_id')
  .select(
    'org_inv_sent.organization_invite_sent_id',
    'org_inv_sent.status',
    'org_inv_sent.user_id as sent_by_user_id',
    'org_inv_sent.created_at as organization_invite_sent_created_at',
    'org_inv_sent.modified_at as organization_invite_sent_modified_at',
    
    'org_inv.organization_invite_id',
    'org_inv.user_id as sent_to_user_id',
    'org_inv.message',
    'org_inv.organization_id',
    'org_inv.created_at  as organization_invite_created_at',
    'org_inv.modified_at as organization_invite_modified_at',

    'org_inv.organization_id',
    'org.organization_name',
    'org.organization_description',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at'
  )
  .where({ organization_invite_sent_id })
  .first();
  return {
    organization_invite_sent_id: row.organization_invite_sent_id,
    status: row.status,
    sent_by_user_id: row.sent_by_user_id,
    created_at: row.organization_invite_sent_created_at,
    modified_at: row.organization_invite_sent_modified_at,
    
    organization_invite: {
      organization_invite_id: row.organization_invite_id,
      sent_to_user_id: row.sent_to_user_id,
      message: row.message,
      organization_id: row.organization_id,
      created_at: row.organization_invite_created_at,
      modified_at: row.organization_invite_modified_at
    },
    
    organization: {
      organization_id: row.organization_id,
      name: row.organization_name,
      description: row.organization_description,
      created_at: row.organization_created_at,
      modified_at: row.organization_modified_at,
    }
  }
};

const create = async () => {

};

const updateById = async (
  organization_invite_sent_id,
  changes
) => {
  const oldOrgInvSent = await findById(organization_invite_sent_id);
  console.log('oldOrgInvSent', oldOrgInvSent)
  
  const [ organization_invites_sent ] = await db('organization_invites_sent as org_inv_sent')
  .where({ organization_invite_sent_id })
  .update({
    status: changes.status || oldOrgInvSent.status,
    organization_invite_id: changes.organization_invite_id  || oldOrgInvSent.organization_invite.organization_invite_id,
    user_id: changes.user_id || oldOrgInvSent.sent_by_user_id,
    created_at: changes.created_at || oldOrgInvSent.created_at,
    modified_at: db.fn.now()
  }, ['org_inv_sent.organization_invite_sent_id']);
  
  const updatedOrgInvSent = await findById(organization_invites_sent.organization_invite_sent_id);
  
  
  if(updatedOrgInvSent.status === 'accepted'){
    const roleToUse = await db('roles as r').where({ role_name: 'employee_user' }).first();
    
    await Employee.create({
      organization_id: updatedOrgInvSent.organization.organization_id,
      user_id: updatedOrgInvSent.organization_invite.sent_to_user_id,
      role_id: roleToUse.role_id
    });
    
  }
  
  return updatedOrgInvSent;
};

const deleteById = async () => {

};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  updateById,
  deleteById
}