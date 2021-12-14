const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('employees as emp')
  .join('users as u', 'u.user_id', 'emp.user_id')
  .join('organizations as org', 'org.organization_id', 'org.organization_id')
  .join('roles as r', 'r.role_id', 'emp.role_id')
  .select(
    'emp.employee_id',
    'emp.first_name',
    'emp.last_name',
    'emp.phone_number',
    'emp.phone_number_type',
    'emp.gender',
    'emp.date_of_birth',
    'emp.user_id',
    
    'u.email',
  
    'emp.created_at as employee_created_at',
    'emp.modified_at as employee_modified_at',
    
    'emp.organization_id',
    'org.organization_name as organization_name',
    'org.organization_description as organization_description',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at',

    'emp.role_id as employee_role_id',
    'r.role_name as employee_role_name',
    'r.role_description as employee_role_description',
    'r.created_at as employee_role_created_at',
    'r.modified_at as employee_role_modified_at'
  )

  const employees = rows.map(row => {
    return {
      employee_id: row.employee_id,
      first_name: row.first_name,
      last_name: row.last_name,
      phone_number: row.phone_number,
      phone_number_type: row.phone_number_type,
      gender: row.gender,
      date_of_birth: row.date_of_birth,
      user_id: row.user_id,
      email: row.email,
      created_at: row.employee_created_at,
      modified_at: row.employee_modified_at,
      
      organization: {
        organization_id: row.organization_id,
        name: row.organization_name,
        description: row.organization_description,
        created_at: row.organization_created_at,
        modified_at: row.organization_modified_at
      },

      role: {
        role_id: row.employee_role_id,
        name: row.employee_role_name,
        description: row.employee_role_description,
        created_at: row.employee_role_created_at,
        modified_at: row.employee_role_modified_at
      }
    }
  })

  return employees;
}

const findBy = async (filter) => {
  const rows = await db('employees as emp')
  .join('users as u', 'u.user_id', 'emp.user_id')
  .join('organizations as org', 'org.organization_id', 'org.organization_id')
  .join('roles as r', 'r.role_id', 'emp.role_id')
  .select(
    'emp.employee_id',
    'emp.first_name',
    'emp.last_name',
    'emp.phone_number',
    'emp.phone_number_type',
    'emp.gender',
    'emp.date_of_birth',
    'emp.user_id',
    
    'u.email',
  
    'emp.created_at as employee_created_at',
    'emp.modified_at as employee_modified_at',
    
    'emp.organization_id',
    'org.organization_name as organization_name',
    'org.organization_description as organization_description',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at',

    'emp.role_id as employee_role_id',
    'r.role_name as employee_role_name',
    'r.role_description as employee_role_description',
    'r.created_at as employee_role_created_at',
    'r.modified_at as employee_role_modified_at'
  )
  .where(filter)
  .orderBy('emp.employee_id', 'asc')
  const employees = rows.map(row => {
    return {
      employee_id: row.employee_id,
      first_name: row.first_name,
      last_name: row.last_name,
      phone_number: row.phone_number,
      phone_number_type: row.phone_number_type,
      gender: row.gender,
      date_of_birth: row.date_of_birth,
      user_id: row.user_id,
      email: row.email,
      created_at: row.employee_created_at,
      modified_at: row.employee_modified_at,
      
      organization: {
        organization_id: row.organization_id,
        name: row.organization_name,
        description: row.organization_description,
        created_at: row.organization_created_at,
        modified_at: row.organization_modified_at
      },

      role: {
        role_id: row.employee_role_id,
        name: row.employee_role_name,
        description: row.employee_role_description,
        created_at: row.employee_role_created_at,
        modified_at: row.employee_role_modified_at
      }
    }
  })
  return employees;
}

const create = async (employee) => {
  const [ emp ] = await db('employees as emp')
  .insert({
    first_name: employee.first_name || null,
    last_name: employee.last_name || null,
    phone_number: employee.phone_number || null,
    phone_number_type: employee.phone_number_type || null,
    gender: employee.gender || null,
    date_of_birth: employee.date_of_birth || null,
    
    user_id: employee.user_id,
    role_id: employee.role_id,
    organization_id: employee.organization_id
  
  }, ['emp.employee_id']);

  const [ newEmp ] = await findBy({ employee_id: emp.employee_id })
  
  return newEmp;
};

module.exports = {
  findAll,
  findBy,
  create
}