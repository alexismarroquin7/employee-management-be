const router = require('express').Router();
const Role = require('./roles-model');
const {
  validateNewRoleRequiredFields,
  validateRoleNameUnique,
  validateRoleExistsById
} = require('./roles-middleware')

router.get('/', async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch(err) {
    next(err);
  }
});

router.get('/:role_id', validateRoleExistsById, async (req, res) => {
  res.status(200).json(req.role);
});

router.post('/', validateNewRoleRequiredFields, validateRoleNameUnique, async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const role = await Role.create({ name, description });
    res.status(200).json(role);
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