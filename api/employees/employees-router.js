const router = require('express').Router();
const Employee = require('./employees-model');
const {
  handleQuery,
  validateEmployeeExistsById,
  validateEmployeeRequiredFields,
  validateRoleIdExists,
  validateUserIdExists,
  validateOrganizationIdExists
} = require('./employee-middleware');

router.get('/', handleQuery, async (req, res, next) => {
  
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch(err) {
    next(err);
  }
});

router.get('/:employee_id', validateEmployeeExistsById, async (req, res) => {
  res.status(200).json(req.employee);
});

router.put(
  '/:employee_id',
  validateEmployeeExistsById,
  validateEmployeeRequiredFields,
  validateRoleIdExists,
  validateUserIdExists,
  validateOrganizationIdExists,
  async (req, res, next) => {
    try {
      const employee = await Employee.updateById(Number(req.params.employee_id), req.body);
      res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
});

router.use((err, req, res, next) => {//eslint-disable-line
  res
  .status(err.status || 500)
  .json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;