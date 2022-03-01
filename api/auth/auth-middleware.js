const User = require('../users/users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { generateJsonWebTokenForUser } = require('../utils');

const validateLoginRequiredFields = async (req, res, next) => {
  const { email, password } = req.body;
  
  if(!email || !password){
    next({
      status: 400,
      message: "email and password are required to login"
    });
  } else {
    next();
  }
}

const validateUserExistsByEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const [ user ] = await User.findBy({ email });
    if(!user){
      next({
        status: 404,
        message: "user does not exist"
      })
    } else {
      if(!user.email_confirmed){
        next({
          status: 400,
          message: "email has not been confirmed"
        });
      } else {
        req.user = user;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  const valid = bcrypt.compareSync(password, req.user.password);
  if(valid){
    next();
  } else {
    next({
      status: 400,
      message: "incorrect password"
    });
  }
}
const handleJsonWebToken = (req, res, next) => {
  try {
    const token = generateJsonWebTokenForUser(req.user);
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateLoginRequiredFields,
  validatePassword,
  validateUserExistsByEmail,
  handleJsonWebToken
}