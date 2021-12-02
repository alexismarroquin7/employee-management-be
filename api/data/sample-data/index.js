const roles = require('./001-roles');
const users = require('./002-users');
const addresses = require('./003-addresses');
const organizations = require('./004-organizations');
const employees = require('./005-employees');
const departments = require('./006-departments');
const jobs = require('./007-jobs');
const organization_addresses = require('./008-organization_addresses');
const job_addresses = require('./009-job_addresses');
const employee_jobs = require('./010-employee_jobs');
const shifts = require('./011-shifts');
const shifts_worked = require('./012-shifts_worked');
const employee_addresses = require('./013-employee_addresses');
const employee_contacts = require('./014-employee_contacts');
module.exports = {
  roles,
  users,
  addresses,
  organizations,
  employees,
  departments,
  jobs,
  organization_addresses,
  job_addresses,
  employee_jobs,
  shifts,
  shifts_worked,
  employee_addresses,
  employee_contacts
}