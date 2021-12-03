exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', roles => {
      roles.increments('role_id')
      
      roles.string('role_name')
      .unique()
      .notNullable();
      
      roles.string('role_description');

      roles.timestamp('created_at').defaultTo(knex.fn.now());
      roles.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('users', users => {
      users.increments('user_id')
      users.string('email')
      .notNullable()
      users.integer('email_confirmed')
      .notNullable()
      users.string('password')
      .notNullable()

      users.integer('role_id')
      .unsigned()
      .notNullable()
      .references('role_id')
      .inTable('roles')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      
      users.timestamp('created_at').defaultTo(knex.fn.now());
      users.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('addresses', addresses => {
      addresses.increments('address_id');
      addresses.string('address_line_1');
      addresses.string('address_line_2');
      addresses.string('city');
      addresses.string('state');
      addresses.string('country');
      addresses.string('postal_code');
      addresses.string('address_type');
      
      addresses.timestamp('created_at').defaultTo(knex.fn.now());
      addresses.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('organizations', organizations => {
      organizations.increments('organization_id')
      organizations.string('organization_name');
      organizations.string('organization_description');

      organizations.timestamp('created_at').defaultTo(knex.fn.now());
      organizations.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('employees', employees => {
      employees.increments('employee_id')
      employees.string('first_name');
      employees.string('last_name');
      employees.string('phone_number');
      employees.string('phone_number_type');
      employees.string('gender');
      employees.string('date_of_birth');

      employees.integer('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      ;

      employees.timestamp('created_at').defaultTo(knex.fn.now());
      employees.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('departments', departments => {
      departments.increments('department_id')
      departments.string('department_name');
      departments.string('department_description');
      departments.integer('organization_id')
      .unsigned()
      .notNullable()
      .references('organization_id')
      .inTable('organizations')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      ;

      departments.timestamp('created_at').defaultTo(knex.fn.now());
      departments.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('jobs', jobs => {
      jobs.increments('job_id');
      jobs.string('job_title');
      jobs.string('job_description');
      jobs.string('job_requirements');
      jobs.integer('job_pay_period');
      jobs.integer('job_rate_min');
      jobs.integer('job_rate_max');
      jobs.integer('deparment_id')
      .unsigned()
      .notNullable()
      .references('department_id')
      .inTable('departments')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

      jobs.timestamp('created_at').defaultTo(knex.fn.now());
      jobs.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('organization_addresses', organization_addresses => {
      organization_addresses.increments('organization_address_id');
      organization_addresses.string('organization_address_nick_name');
      organization_addresses.integer('organization_id')
      .unsigned()
      .notNullable()
      .references('organization_id')
      .inTable('organizations')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      ;
      organization_addresses.integer('address_id')
      .unsigned()
      .notNullable()
      .references('address_id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      ;

      organization_addresses.timestamp('created_at').defaultTo(knex.fn.now());
      organization_addresses.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('job_addresses', job_addresses => {
      job_addresses.increments('job_address_id');
      job_addresses.integer('organization_address_id')
      .unsigned()
      .notNullable()
      .references('organization_address_id')
      .inTable('organization_addresses')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      job_addresses.integer('job_id')
      .unsigned()
      .notNullable()
      .references('job_id')
      .inTable('jobs')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

      job_addresses.timestamp('created_at').defaultTo(knex.fn.now());
      job_addresses.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('employee_jobs', employee_jobs => {
      employee_jobs.increments('employee_job_id');
      employee_jobs.integer('employee_job_active');
      employee_jobs.integer('pay_rate');
      employee_jobs.string('pay_period');

      employee_jobs.integer('employee_id')
      .unsigned()
      .notNullable()
      .references('employee_id')
      .inTable('employees')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

      employee_jobs.integer('job_id')
      .unsigned()
      .notNullable()
      .references('job_id')
      .inTable('jobs')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      
      employee_jobs.integer('role_id')
      .unsigned()
      .notNullable()
      .references('role_id')
      .inTable('roles')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      
      employee_jobs.integer('organization_address_id')
      .unsigned()
      .notNullable()
      .references('organization_address_id')
      .inTable('organization_addresses')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

      employee_jobs.timestamp('created_at').defaultTo(knex.fn.now());
      employee_jobs.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('shifts', shifts => {
      shifts.increments('shift_id');
      shifts.string('shift_start_time');
      shifts.string('shift_end_time');
      shifts.string('shift_start_date');
      shifts.string('shift_end_date');
      shifts.integer('shift_duration');
      shifts.integer('pay_rate');
      shifts.string('pay_type');
      shifts.integer('shift_confirmed_by_employee');
      
      shifts.integer('employee_job_id')
      .unsigned()
      .notNullable()
      .references('employee_job_id')
      .inTable('employee_jobs')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

      shifts.timestamp('created_at').defaultTo(knex.fn.now());
      shifts.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('shifts_worked', shifts_worked => {
      shifts_worked.increments('shift_worked_id')
      shifts_worked.string('clock_in')
      shifts_worked.string('meal_out')
      shifts_worked.string('meal_in')
      shifts_worked.string('clock_out')
      shifts_worked.string('clock_duration')
      shifts_worked.string('meal_duration')
      shifts_worked.integer('amount_earned')
      shifts_worked.integer('shift_worked_confirmed_by_employee')
      shifts_worked.integer('is_clocked_in')
      
      shifts_worked.integer('shift_id')
      .unsigned()
      .notNullable()
      .references('shift_id')
      .inTable('shifts')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

      shifts_worked.timestamp('created_at').defaultTo(knex.fn.now());
      shifts_worked.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('employee_addresses', employee_addresses => {
      employee_addresses.increments('employee_address_id')
      employee_addresses.integer('employee_id')
      .unsigned()
      .notNullable()
      .references('employee_id')
      .inTable('employees')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      employee_addresses.integer('address_id')
      .unsigned()
      .notNullable()
      .references('address_id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      employee_addresses.timestamp('created_at').defaultTo(knex.fn.now());
      employee_addresses.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    .createTable('employee_contacts', employee_contacts => {
      employee_contacts.increments('employee_contact_id')
      employee_contacts.string('employee_contact_first_name')
      employee_contacts.string('employee_contact_last_name')
      employee_contacts.string('phone_number')
      employee_contacts.string('phone_number_type')
      employee_contacts.string('relation_type')
      
      employee_contacts.integer('address_id')
      .unsigned()
      .notNullable()
      .references('address_id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      employee_contacts.integer('employee_id')
      .unsigned()
      .notNullable()
      .references('employee_id')
      .inTable('employees')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

      employee_contacts.timestamp('created_at').defaultTo(knex.fn.now());
      employee_contacts.timestamp('modified_at').defaultTo(knex.fn.now());
    })
    ;
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('employee_contacts')
  await knex.schema.dropTableIfExists('employee_addresses')
  await knex.schema.dropTableIfExists('shifts_worked')
  await knex.schema.dropTableIfExists('shifts')
  await knex.schema.dropTableIfExists('employee_jobs')
  await knex.schema.dropTableIfExists('job_addresses')
  await knex.schema.dropTableIfExists('organization_addresses')
  await knex.schema.dropTableIfExists('jobs')
  await knex.schema.dropTableIfExists('departments')
  await knex.schema.dropTableIfExists('employees')
  await knex.schema.dropTableIfExists('organizations')
  await knex.schema.dropTableIfExists('addresses')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('roles')
}
