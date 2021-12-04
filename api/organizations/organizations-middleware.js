
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

module.exports = {
  validateNewOrganizationRequiredFields
};