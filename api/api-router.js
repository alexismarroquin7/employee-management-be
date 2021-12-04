const router = require('express').Router();
const rolesRouter = require('./roles/roles-router');
const usersRouter = require('./users/users-router');
const addressesRouter = require('./addresses/addresses-router');
const organizationsRouter = require('./organizations/organizations-router');
const employeesRouter = require('./employees/employees-router');
const authRouter = require('./auth/auth-router');

router.use('/roles', rolesRouter);
router.use('/users', usersRouter);
router.use('/addresses', addressesRouter);
router.use('/organizations', organizationsRouter);
router.use('/employees', employeesRouter);
router.use('/auth', authRouter);

module.exports = router;