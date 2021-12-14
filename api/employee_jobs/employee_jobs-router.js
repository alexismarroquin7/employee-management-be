const router = require('express').Router();
const { findAll } = require('./employee_jobs_model');

router.get('/', async (req, res, next) => {
  try {
    const employeeJobs = await findAll();
    res
    .status(200)
    .json(employeeJobs);
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next)=> { // eslint-disable-line
  res
  .status(
    err.status || 500
  )
  .json({
    stack: err.stack,
    message: err.message
  })
})

module.exports = router;