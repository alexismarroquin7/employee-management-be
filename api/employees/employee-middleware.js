const { isEmptyObj } = require('../utils');

const Employee = require('./employees-model');
const User = require('../users/users-model');
const Role = require('../roles/roles-model');
const Organization = require('../organizations/organizations-model');

const handleQuery = async (req, res, next) => {
  if(isEmptyObj(req.query)){
    next();
  } else {
    if(req.query.user_id){
      try {
        const employees = await Employee.findBy({ 'emp.user_id': Number(req.query.user_id) });
        if(employees && Array.isArray(employees) && employees.length > 0){
          res.status(200).json(employees);
        } else {
          next({
            status: 404,
            message: `employee of user_id ${req.query.user_id} does not exist`
          });
        }
      } catch (err) {
        next(err);
      }
    } else if(req.query.organization_id){
      try {
        const employees = await Employee.findBy({ 'org.organization_id': Number(req.query.organization_id) });
        if(employees && Array.isArray(employees) && employees.length > 0){
          res.status(200).json(employees);
        } else {
          next({
            status: 404,
            message: `organization_id ${req.query.organization_id} does not exist`
          });
        }
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  }
}

const validateEmployeeExistsById = async (req, res, next) => {
  const { employee_id } = req.params;
  
  try {
    const [ employee ] = await Employee
    .findBy({ employee_id: Number(employee_id) });

    if(!employee){
      next({
        status: 404,
        message: `employee_id: ${employee_id} does not exist`
      });

    } else {
      req.employee = employee;
      next();
    }
  } catch (err) {
    next(err);
  }
}

const validateEmployeeRequiredFields = async (req, res, next) => {
  const { user_id, role_id, organization_id } = req.body;

  if(!user_id || !role_id || !organization_id){
    next({
      status: 400,
      message: `{user_id} , {role_id} , and {organization_id} are required`
    });

  } else {
    next();
  }
}

const validateUserIdExists = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const [user] = await User.findBy({ user_id });
    
    if(user){
      next();
    } else {
      next({
        status: 404,
        message: `user_id: ${user_id} does not exist`
      });  
    }
  } catch (err) {
    next(err);
  }
}

const validateRoleIdExists = async (req, res, next) => {
  const { role_id } = req.body;
  try {
    const role = await Role.findById(role_id);
    if(role){
      next();
    } else {
      next({
        status: 404,
        message: `role_id: ${role_id} does not exist`
      });
      
    }
  } catch (err) {
    next(err);
  }
}

const validateOrganizationIdExists = async (req, res, next) => {
  const { organization_id } = req.body;
  try {
    const organization = await Organization.findById(organization_id);
    if(organization){
      next();
    } else {
      next({
        status: 404,
        message: `organization_id: ${organization_id} does not exist`
      });
      
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { 
  handleQuery,
  validateEmployeeExistsById,
  validateEmployeeRequiredFields,
  validateRoleIdExists,
  validateUserIdExists,
  validateOrganizationIdExists
};