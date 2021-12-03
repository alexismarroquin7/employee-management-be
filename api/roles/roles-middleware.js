const Role = require('./roles-model');

const validateNewRoleRequiredFields = async (req, res, next) => {
  const { name, description } = req.body;
  if(!name || !description){
    next({
      status: 400,
      message: 'role missing {name} or {description}'
    })
  } else {
    next();
  }
}

const validateRoleNameUnique = async (req, res, next) => {
  const { name } = req.body;
  try {
    const [ role ] = await Role.findBy({ role_name: name });
    if(role){
      next({
        status: 400,
        message: `{role_name: ${name}} is taken`
      })
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

const validateRoleExistsById = async (req, res, next) => {
  const { role_id } = req.params;
  try {
    const role = await Role.findById(Number(role_id));
    if(role){
      req.role = role;
      next();
    } else {
      next({
        status: 201,
        message: `{role_id: ${role_id}} does not exist`
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateNewRoleRequiredFields,
  validateRoleNameUnique,
  validateRoleExistsById
}