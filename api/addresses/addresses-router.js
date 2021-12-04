const router = require('express').Router();
const Address = require('./addresses-model');

router.get('/', async (req, res, next) => {
  try {
    const addresses = await Address.findAll();
    res.status(200).json(addresses);
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