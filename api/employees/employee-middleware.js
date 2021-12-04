const Employee = require('./employees-model');
const { isEmptyObj } = require('../utils');

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
    } else {
      next();
    }
  }
}
module.exports = { handleQuery };