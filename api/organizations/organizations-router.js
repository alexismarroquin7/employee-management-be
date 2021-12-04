const router = require('express').Router();
const Organization = require('./organizations-model');

router.get('/', async (req, res, next) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).json(organizations);
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