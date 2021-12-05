const { isEmptyObj } = require("../utils");
const { findBy } = require("./users-model");

const handleEmailQuery = async (req, res, next) => {
  if(isEmptyObj(req.query)){
    next();
  } else {
    if(req.query.email){
      try {
        const [ user ] = await findBy({'u.email': req.query.email })
        console.log('here')
        if(user){
          res.status(200).json(user);
        } else {
          next({
            status: 404,
            message: `users of email ${req.query.email} was not found`
          })
        }
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  }
}

module.exports = {
  handleEmailQuery
}