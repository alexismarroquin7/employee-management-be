const OrganizationInvitesSent = require('./organization_invites_sent-model');
const User = require('../users/users-model');
const OrganizationInvite = require('../organization_invites/organization_invites-model');
const { isEmptyObj } = require('../utils');

const validateOrganizationInviteSentExistsById = async (req, res, next) => {
  const { organization_invite_sent_id } = req.params;
  
  try {
    const organizationInviteSent = await OrganizationInvitesSent.findById(Number(organization_invite_sent_id));
    if(organizationInviteSent) {
      req.organization_invite_sent = organizationInviteSent;
      next();
    } else {
      next({
        status: 404,
        message: `organization_invite_sent of id ${organization_invite_sent_id} does not exist`
      })
    }
  } catch (err) {
    next(err);
  }
}

const validateOrganizationInviteSentRequiredFields = async (req, res, next) => {
  const { user_id, organization_invite_id, status } = req.body;
  if(!user_id||!organization_invite_id||!status){
    next({
      status: 400,
      message: `organization_invite_sent missing required fields`
    })
  } else if(
    status !== 'pending'||
    status !== 'rejected'||
    status !== 'accepted'
  ){
    next({
      status: 400,
      message: `status must be 'pending', 'rejected', or 'accepted'`
    })
  } else {
    next();
  }
}

const validateOrganizationInviteExistsById = async (req, res, next) => {
  const { organization_invite_id } = req.body;
  try {
    const organizationInvite = await OrganizationInvite.findById(organization_invite_id);
    if(organizationInvite) {
      next();
    } else {
      next({
        status: 404,
        message: `organization_invite of id ${organization_invite_id} does not exist`
      })
    }
  } catch (err) {
    next(err);
  }
}

const validateUserExistsById = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const [ user ] = await User.findBy({ user_id });
    if(user) {
      next();
    } else {
      next({
        status: 404,
        message: `user of id ${user_id} does not exist`
      })
    }
  } catch (err) {
    next(err);
  }
}

const handleOrganizationInviteQuery = async (req, res, next) => {
  if(isEmptyObj(req.query)){
    next();
  
  } else {
    if(req.query.organization_invite_id){
      try {
        const [ organizationInviteSent ] = await OrganizationInvitesSent
        .findBy({
          'org_inv.organization_invite_id': Number(req.query.organization_invite_id)
        });
        if(organizationInviteSent){
          res.status(200).json(organizationInviteSent);
        
        } else {
          next({
            status: 404,
            message: `organization_invite_sent of organization_invite_id = ${req.query.organization_invite_id} does not exist`
          });

        }
      } catch (err) {
        next(err);
      }

    } else {
      next();
    }
  }
};

module.exports = {
  validateOrganizationInviteSentRequiredFields,
  validateOrganizationInviteExistsById,
  validateUserExistsById,
  validateOrganizationInviteSentExistsById,
  handleOrganizationInviteQuery
}