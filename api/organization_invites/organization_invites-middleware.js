const User = require('../users/users-model');
const Organization = require('../organizations/organizations-model');
const OrganizationInvite = require('./organization_invites-model');

const validateNewOrganizationInviteRequiredFields = async (req, res, next) => {
  const { organization_id, user_id, sent_by_user_id } = req.body;
  if(!organization_id || !user_id || !sent_by_user_id){
    next({
      status: 400,
      message: 'organization_id and user_id are required'
    });
  } else {
    next();
  }
}

const validateOrganizationExistsById = async (req, res, next) => {
  const { organization_id } = req.body;
  try {
    const organization = await Organization.findById(Number(organization_id));
    if(!organization){
      next({
        status: 404,
        message: `organization of id ${organization_id} does not exist`
      });
    } else {
      next();
    }
  } catch(err) {
    next(err);
  }
}

const validateOrganizationInviteExistsById = async (req, res, next) => {
  const { organization_invite_id } = req.params;
  try {
    const organization_invite = await OrganizationInvite.findById(Number(organization_invite_id));
    if(!organization_invite){
      next({
        status: 404,
        message: `organization_invite of id ${organization_invite_id} does not exist`
      });
    } else {
      req.organization_invite = organization_invite;
      next();
    }
  } catch(err) {
    next(err);
  }
}

const validateUserExistsById = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const [ user ] = await User.findBy({ user_id: Number(user_id) });
    if(!user){
      next({
        status: 404,
        message: `user of id ${user_id} does not exist`
      });
    } else {
      next();
    }
  } catch(err) {
    next(err);
  }
}

const validateSentByUserExistsById = async (req, res, next) => {
  const { sent_by_user_id } = req.body;
  
  try {
    const [ user ] = await User.findBy({ user_id: Number(sent_by_user_id) });
    if(!user){
      next({
        status: 404,
        message: `user of id ${sent_by_user_id} does not exist`
      });
    } else {
      next();
    }
  } catch(err) {
    next(err);
  }
}

module.exports = {
  validateNewOrganizationInviteRequiredFields,
  validateOrganizationExistsById,
  validateOrganizationInviteExistsById,
  validateUserExistsById,
  validateSentByUserExistsById
}