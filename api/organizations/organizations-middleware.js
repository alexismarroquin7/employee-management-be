const Organization = require("./organizations-model");

const validateNewOrganizationRequiredFields = (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    next({
      status: 400,
      message: 'name or description missing'
    })
  } else {
    next();
  }
}

const validateOrganizationExistsById = async (req, res, next) => {
  const { organization_id } = req.params;
  
  try {
    const organization = await Organization.findById(Number(organization_id));
    if (organization) {
      req.organization = organization;
      next()
    } else {
      next({
        status: 404,
        message: `organization of id ${organization_id} does not exist`
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateNewOrganizationRequiredFields,
  validateOrganizationExistsById
};