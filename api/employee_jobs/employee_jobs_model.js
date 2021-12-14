const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('employee_jobs as emp_job')
  .join('employees as emp', 'emp.employee_id', 'emp_job.employee_id')
  .join('organization_addresses as org_add', 'org_add.organization_address_id', 'emp_job.organization_address_id')
  .join('roles as r', 'r.role_id', 'emp_job.role_id')
  .join('jobs as j', 'j.job_id', 'emp_job.job_id')
  .join('departments as d', 'd.department_id', 'j.department_id')
  .join('organizations as org', 'org.organization_id', 'org_add.organization_id')
  .join('addresses as add', 'add.address_id', 'org_add.address_id')
  .select(
    'emp_job.employee_job_id',
    'emp_job.employee_job_active',
    'emp_job.pay_rate',
    'emp_job.pay_period',
    'emp_job.created_at as employee_job_created_at',
    'emp_job.modified_at as employee_job_modified_at',
    
    'j.job_id',
    'j.job_title',
    'j.job_description',
    'j.job_requirements',
    'j.job_pay_period',
    'j.job_rate_min',
    'j.job_rate_max',
    'j.created_at as job_created_at',
    'j.modified_at as job_modified_at',
    
    'j.department_id',
    'd.department_name',
    'd.department_description',
    'd.created_at as department_created_at',
    'd.modified_at as department_modified_at',
    
    'emp_job.role_id',
    'r.role_name',
    'r.role_description',
    'r.created_at as role_created_at',
    'r.modified_at as role_modified_at',
    
    'org_add.organization_address_id',
    'org_add.organization_address_nick_name',
    'org_add.created_at as organization_address_created_at',
    'org_add.modified_at as organization_address_modified_at',
    
    'org_add.address_id',
    'add.address_line_1',
    'add.address_line_2',
    'add.city',
    'add.state',
    'add.country',
    'add.postal_code',
    'add.address_type',
    'add.created_at as address_created_at',
    'add.modified_at as address_modified_at',

    'org_add.organization_id',
    'org.organization_name',
    'org.organization_description',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at'
  )

  const employeeJobs = rows.map(row => {
    return {
      employee_job_id: row.employee_job_id,
      employee_job_active: row.employee_job_active,
      pay_rate: row.pay_rate,
      pay_period: row.pay_period,
      created_at: row.employee_job_created_at,
      modified_at: row.employee_job_modified_at,

      job: {
        job_id: row.job_id,
        job_title: row.job_title,
        job_description: row.job_description,
        job_requirements: row.job_requirements,
        job_pay_period: row.job_pay_period,
        job_rate_min: row.job_rate_min,
        job_rate_max: row.job_rate_max,
        created_at: row.job_created_at,
        modified_at: row.job_modified_at,
      },
      department: {
        department_id: row.department_id,
        department_name: row.department_name,
        department_description: row.department_description,
        created_at: row.department_created_at,
        modified_at: row.department_modified_at,
      },
      role: {
        role_id: row.role_id,
        role_name: row.role_name,
        role_description: row.role_description,
        created_at: row.role_created_at,
        modified_at: row.role_modified_at,
      },
      organization: {
        organization_id: row.organization_id,
        organization_name: row.organization_name,
        organization_description: row.organization_description,
        created_at: row.organization_created_at,
        modified_at: row.organization_modified_at,
      },
      oranization_address: {
        organization_address_id: row.organization_address_id,
        nick_name: row.organization_address_nick_name,
        created_at: row.organization_address_created_at,
        modified_at: row.organization_address_modified_at,
        address: {
          address_id: row.address_id,
          address_line_1: row.address_line_1,
          address_line_2: row.address_line_2,
          city: row.city,
          state: row.state,
          country: row.country,
          postal_code: row.postal_code,
          address_type: row.address_type,
          created_at: row.address_created_at,
          modified_at: row.address_modified_at
        }
      }
    }
  })
  return employeeJobs;
}

const findById = async employee_job_id => {
  const row = await db('employee_jobs as emp_job')
  .join('employees as emp', 'emp.employee_id', 'emp_job.employee_id')
  .join('organization_addresses as org_add', 'org_add.organization_address_id', 'emp_job.organization_address_id')
  .join('roles as r', 'r.role_id', 'emp_job.role_id')
  .join('jobs as j', 'j.job_id', 'emp_job.job_id')
  .join('departments as d', 'd.department_id', 'j.department_id')
  .join('organizations as org', 'org.organization_id', 'org_add.organization_id')
  .join('addresses as add', 'add.address_id', 'org_add.address_id')
  .select(
    'emp_job.employee_job_id',
    'emp_job.employee_job_active',
    'emp_job.pay_rate',
    'emp_job.pay_period',
    'emp_job.created_at as employee_job_created_at',
    'emp_job.modified_at as employee_job_modified_at',
    
    'j.job_id',
    'j.job_title',
    'j.job_description',
    'j.job_requirements',
    'j.job_pay_period',
    'j.job_rate_min',
    'j.job_rate_max',
    'j.created_at as job_created_at',
    'j.modified_at as job_modified_at',
    
    'j.department_id',
    'd.department_name',
    'd.department_description',
    'd.created_at as department_created_at',
    'd.modified_at as department_modified_at',
    
    'emp_job.role_id',
    'r.role_name',
    'r.role_description',
    'r.created_at as role_created_at',
    'r.modified_at as role_modified_at',
    
    'org_add.organization_address_id',
    'org_add.organization_address_nick_name',
    'org_add.created_at as organization_address_created_at',
    'org_add.modified_at as organization_address_modified_at',
    
    'org_add.address_id',
    'add.address_line_1',
    'add.address_line_2',
    'add.city',
    'add.state',
    'add.country',
    'add.postal_code',
    'add.address_type',
    'add.created_at as address_created_at',
    'add.modified_at as address_modified_at',

    'org_add.organization_id',
    'org.organization_name',
    'org.organization_description',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at'
  )
  .where({ employee_job_id })
  .first();

  
  return {
    employee_job_id: row.employee_job_id,
    employee_job_active: row.employee_job_active,
    pay_rate: row.pay_rate,
    pay_period: row.pay_period,
    created_at: row.employee_job_created_at,
    modified_at: row.employee_job_modified_at,

    job: {
      job_id: row.job_id,
      job_title: row.job_title,
      job_description: row.job_description,
      job_requirements: row.job_requirements,
      job_pay_period: row.job_pay_period,
      job_rate_min: row.job_rate_min,
      job_rate_max: row.job_rate_max,
      created_at: row.job_created_at,
      modified_at: row.job_modified_at,
    },
    department: {
      department_id: row.department_id,
      department_name: row.department_name,
      department_description: row.department_description,
      created_at: row.department_created_at,
      modified_at: row.department_modified_at,
    },
    role: {
      role_id: row.role_id,
      role_name: row.role_name,
      role_description: row.role_description,
      created_at: row.role_created_at,
      modified_at: row.role_modified_at,
    },
    organization: {
      organization_id: row.organization_id,
      organization_name: row.organization_name,
      organization_description: row.organization_description,
      created_at: row.organization_created_at,
      modified_at: row.organization_modified_at,
    },
    oranization_address: {
      organization_address_id: row.organization_address_id,
      nick_name: row.organization_address_nick_name,
      created_at: row.organization_address_created_at,
      modified_at: row.organization_address_modified_at,
      address: {
        address_id: row.address_id,
        address_line_1: row.address_line_1,
        address_line_2: row.address_line_2,
        city: row.city,
        state: row.state,
        country: row.country,
        postal_code: row.postal_code,
        address_type: row.address_type,
        created_at: row.address_created_at,
        modified_at: row.address_modified_at
      }
    }
  }
}

const findBy = async filter => {
  const rows = await db('employee_jobs as emp_job')
  .join('employees as emp', 'emp.employee_id', 'emp_job.employee_id')
  .join('organization_addresses as org_add', 'org_add.organization_address_id', 'emp_job.organization_address_id')
  .join('roles as r', 'r.role_id', 'emp_job.role_id')
  .join('jobs as j', 'j.job_id', 'emp_job.job_id')
  .join('departments as d', 'd.department_id', 'j.department_id')
  .join('organizations as org', 'org.organization_id', 'org_add.organization_id')
  .join('addresses as add', 'add.address_id', 'org_add.address_id')
  .select(
    'emp_job.employee_job_id',
    'emp_job.employee_job_active',
    'emp_job.pay_rate',
    'emp_job.pay_period',
    'emp_job.created_at as employee_job_created_at',
    'emp_job.modified_at as employee_job_modified_at',
    
    'j.job_id',
    'j.job_title',
    'j.job_description',
    'j.job_requirements',
    'j.job_pay_period',
    'j.job_rate_min',
    'j.job_rate_max',
    'j.created_at as job_created_at',
    'j.modified_at as job_modified_at',
    
    'j.department_id',
    'd.department_name',
    'd.department_description',
    'd.created_at as department_created_at',
    'd.modified_at as department_modified_at',
    
    'emp_job.role_id',
    'r.role_name',
    'r.role_description',
    'r.created_at as role_created_at',
    'r.modified_at as role_modified_at',
    
    'org_add.organization_address_id',
    'org_add.organization_address_nick_name',
    'org_add.created_at as organization_address_created_at',
    'org_add.modified_at as organization_address_modified_at',
    
    'org_add.address_id',
    'add.address_line_1',
    'add.address_line_2',
    'add.city',
    'add.state',
    'add.country',
    'add.postal_code',
    'add.address_type',
    'add.created_at as address_created_at',
    'add.modified_at as address_modified_at',

    'org_add.organization_id',
    'org.organization_name',
    'org.organization_description',
    'org.created_at as organization_created_at',
    'org.modified_at as organization_modified_at'
  )
  .where(filter)

  const employeeJobs = rows.map(row => {
    return {
      employee_job_id: row.employee_job_id,
      employee_job_active: row.employee_job_active,
      pay_rate: row.pay_rate,
      pay_period: row.pay_period,
      created_at: row.employee_job_created_at,
      modified_at: row.employee_job_modified_at,

      job: {
        job_id: row.job_id,
        job_title: row.job_title,
        job_description: row.job_description,
        job_requirements: row.job_requirements,
        job_pay_period: row.job_pay_period,
        job_rate_min: row.job_rate_min,
        job_rate_max: row.job_rate_max,
        created_at: row.job_created_at,
        modified_at: row.job_modified_at,
      },
      department: {
        department_id: row.department_id,
        department_name: row.department_name,
        department_description: row.department_description,
        created_at: row.department_created_at,
        modified_at: row.department_modified_at,
      },
      role: {
        role_id: row.role_id,
        role_name: row.role_name,
        role_description: row.role_description,
        created_at: row.role_created_at,
        modified_at: row.role_modified_at,
      },
      organization: {
        organization_id: row.organization_id,
        organization_name: row.organization_name,
        organization_description: row.organization_description,
        created_at: row.organization_created_at,
        modified_at: row.organization_modified_at,
      },
      oranization_address: {
        organization_address_id: row.organization_address_id,
        nick_name: row.organization_address_nick_name,
        created_at: row.organization_address_created_at,
        modified_at: row.organization_address_modified_at,
        address: {
          address_id: row.address_id,
          address_line_1: row.address_line_1,
          address_line_2: row.address_line_2,
          city: row.city,
          state: row.state,
          country: row.country,
          postal_code: row.postal_code,
          address_type: row.address_type,
          created_at: row.address_created_at,
          modified_at: row.address_modified_at
        }
      }
    }
  })
  
  return employeeJobs;
}

module.exports = {
  findAll,
  findById,
  findBy
}