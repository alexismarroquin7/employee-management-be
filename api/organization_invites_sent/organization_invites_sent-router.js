const router = require('express').Router();
const OrganziationInvitesSent = require('./organization_invites_sent-model');
const {
  validateOrganizationInviteSentExistsById,
  handleOrganizationInviteQuery
} = require('./organization_invites_sent-middleware');

router.get('/', handleOrganizationInviteQuery, async (req, res, next) => {
  try {
    const organizationInvitesSent = await OrganziationInvitesSent.findAll();
    res.status(200).json(organizationInvitesSent);
  } catch (err) {
    next(err);
  }
})

router.get(
  '/:organization_invite_sent_id',
  validateOrganizationInviteSentExistsById,
  async (req, res) => {
  res.status(200).json(req.organization_invite_sent);
})

router.put(
  '/:organization_invite_sent_id',
  validateOrganizationInviteSentExistsById,
  async (req, res, next) => {
  try {
    const organizationInvitesSent = await OrganziationInvitesSent
    .updateById(
      Number(req.params.organization_invite_sent_id),
      req.body
    );
    res.status(200).json(organizationInvitesSent);
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res
  .status(
    err.status || 500
  )
  .json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;