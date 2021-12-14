const router = require('express').Router();
const rolesRouter = require('./roles/roles-router');
const usersRouter = require('./users/users-router');
const addressesRouter = require('./addresses/addresses-router');
const organizationsRouter = require('./organizations/organizations-router');
const employeesRouter = require('./employees/employees-router');
const authRouter = require('./auth/auth-router');
const organizationInvitesRouter = require('./organization_invites/organization_invites-router');
const organizationInvitesSentRouter = require('./organization_invites_sent/organization_invites_sent-router');
const employeeJobsRouter = require('./employee_jobs/employee_jobs-router');

router.use('/roles', rolesRouter);
router.use('/users', usersRouter);
router.use('/addresses', addressesRouter);
router.use('/organizations', organizationsRouter);
router.use('/employees', employeesRouter);
router.use('/auth', authRouter);
router.use('/organization_invites', organizationInvitesRouter);
router.use('/organization_invites_sent', organizationInvitesSentRouter);
router.use('/employee_jobs', employeeJobsRouter);

module.exports = router;