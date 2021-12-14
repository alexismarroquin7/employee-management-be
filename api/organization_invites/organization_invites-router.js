const router = require('express').Router();
const OrganizationInvite = require('./organization_invites-model');
const { 
  validateNewOrganizationInviteRequiredFields,
  validateUserExistsById,
  validateSentByUserExistsById,
  validateOrganizationExistsById,
  validateOrganizationInviteExistsById
} = require('./organization_invites-middleware');


router.get('/', async (req, res, next) => {
  try {
    const organizationInvites = await OrganizationInvite.findAll();
    res.status(200).json(organizationInvites);
  } catch(err){
    next(err);
  }
});

router.get('/:organization_invite_id', validateOrganizationInviteExistsById, (req, res) => {
  res.status(200).json(req.organization_invite)
});

router.post(
  '/', 
  validateNewOrganizationInviteRequiredFields,
  validateUserExistsById,
  validateSentByUserExistsById,
  validateOrganizationExistsById,
  async (req, res, next) => {
    try {
      const organizationInvite = await OrganizationInvite.create(req.body);
      res.status(201).json(organizationInvite)
    } catch(err){
      next(err);
    }
});

router.use((err, req, res, next) => {//eslint-disable-line
  res
  .status(err.status || 500)
  .json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;