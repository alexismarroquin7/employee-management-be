const router = require('express').Router();
const Organization = require('./organizations-model');
const { validateNewOrganizationRequiredFields, validateOrganizationExistsById } = require('./organizations-middleware');

router.get('/', async (req, res, next) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).json(organizations);
  } catch(err) {
    next(err);
  }
});

router.get('/:organization_id', validateOrganizationExistsById, async (req, res, next) => {
  res.status(200).json(req.organization);
});

router.post('/', validateNewOrganizationRequiredFields, async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const organization = await Organization.create({ name, description });
    res.status(200).json(organization);
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