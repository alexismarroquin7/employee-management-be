const router = require('express').Router();
const Employee = require('./employees-model');
const { handleQuery } = require('./employee-middleware');

router.get('/', handleQuery, async (req, res, next) => {
  
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch(err) {
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