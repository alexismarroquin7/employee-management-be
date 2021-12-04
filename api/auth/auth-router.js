const router = require('express').Router();
const {
  validateLoginRequiredFields,
  validatePassword,
  validateUserExistsByEmail,
  handleJsonWebToken
} = require('./auth-middleware');

router.post(
  '/login',
  validateLoginRequiredFields,
  validateUserExistsByEmail,
  validatePassword,
  handleJsonWebToken,
  (req, res) => {
    res
    .status(200)
    .json({
      message: `welcome back, ${req.user.email}`,
      user: req.user,
      token: req.token
    })
});

router.use((err, req, res, next) => {//eslint-disable-line
  res
  .status(err.status || 500)
  .json({
    stack: err.stack,
    message: err.message
  })
})

module.exports = router;