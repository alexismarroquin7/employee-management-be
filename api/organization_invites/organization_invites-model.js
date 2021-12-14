const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('organization_invites as org_inv')
  .join('users as u', 'u.user_id', 'org_inv.user_id')
  .join('organizations as org', 'org.organization_id', 'org_inv.organization_id')
  .select(
    'org_inv.organization_invite_id',
    'org_inv.message',
    'org_inv.created_at as organization_inventory_created_at',
    'org_inv.modified_at as organization_inventory_modified_at',
    
    'org_inv.user_id',
    'u.email',
    'u.created_at as user_created_at',
    'u.modified_at as user_modified_at',

    'org_inv.organization_id',
    'org.organization_name',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at'
  )

  const organizationInvites = rows.map(row => {
    return {
      organization_invite_id: row.organization_invite_id,
      message: row.message,
      created_at: row.organization_inventory_created_at,
      modified_at: row.organization_inventory_modified_at,
      user: {
        user_id: row.user_id,
        email: row.email,
        created_at: row.user_created_at,
        modified_at: row.user_modified_at,
      },
      organization: {
        organization_id: row.organization_id,
        name: row.organization_name,
        created_at: row.organization_created_at,
        modified_at: row.organization_modified_at
      }
    }
  });

  return organizationInvites
}

const findBy = async (filter) => {
  const rows = await db('organization_invites as org_inv')
  .join('users as u', 'u.user_id', 'org_inv.user_id')
  .join('organizations as org', 'org.organization_id', 'org_inv.organization_id')
  .select(
    'org_inv.organization_invite_id',
    'org_inv.message',
    'org_inv.created_at as organization_inventory_created_at',
    'org_inv.modified_at as organization_inventory_modified_at',
    
    'org_inv.user_id',
    'u.email',
    'u.created_at as user_created_at',
    'u.modified_at as user_modified_at',

    'org_inv.organization_id',
    'org.organization_name',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at'
  )
  .where(filter)
  .orderBy('org_inv.organization_invite_id', 'asc')

  const organizationInvites = rows.map(row => {
    return {
      organization_invite_id: row.organization_invite_id,
      message: row.message,
      created_at: row.organization_inventory_created_at,
      modified_at: row.organization_inventory_modified_at,
      user: {
        user_id: row.user_id,
        email: row.email,
        created_at: row.user_created_at,
        modified_at: row.user_modified_at,
      },
      organization: {
        organization_id: row.organization_id,
        name: row.organization_name,
        created_at: row.organization_created_at,
        modified_at: row.organization_modified_at
      }
    }
  });

  return organizationInvites
}

const findById = async (organization_invite_id) => {
  const row = await db('organization_invites as org_inv')
  .join('users as u', 'u.user_id', 'org_inv.user_id')
  .join('organizations as org', 'org.organization_id', 'org_inv.organization_id')
  .select(
    'org_inv.organization_invite_id',
    'org_inv.message',
    'org_inv.created_at as organization_inventory_created_at',
    'org_inv.modified_at as organization_inventory_modified_at',
    
    'org_inv.user_id',
    'u.email',
    'u.created_at as user_created_at',
    'u.modified_at as user_modified_at',

    'org_inv.organization_id',
    'org.organization_name',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at'
  )
  .where({ organization_invite_id })
  .first()
  
   if(row){
    return {
      organization_invite_id: row.organization_invite_id,
      message: row.message,
      created_at: row.organization_inventory_created_at,
      modified_at: row.organization_inventory_modified_at,
      user: {
        user_id: row.user_id,
        email: row.email,
        created_at: row.user_created_at,
        modified_at: row.user_modified_at,
      },
      organization: {
        organization_id: row.organization_id,
        name: row.organization_name,
        created_at: row.organization_created_at,
        modified_at: row.organization_modified_at
      }
    }
  
  } else {
    return null;    
  }
}

const create = async (organizationInvite) => {
  const { organization_id, user_id, message } = organizationInvite;

  const [ organization_invite ] = await db('organization_invites as org_inv').insert({
    organization_id,
    user_id,
    message: message ? message : null
  }, ['org_inv.organization_invite_id']);
  
  await db('organization_invites_sent as org_inv_sent').insert({
    organization_invite_id: organization_invite.organization_invite_id,
    user_id: organizationInvite.sent_by_user_id,
    status: 'pending'
  });

  return findById(organization_invite.organization_invite_id);

}

module.exports = {
  findAll,
  findById,
  findBy,
  create
}