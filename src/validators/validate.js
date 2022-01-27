const {check,  body, validationResult } = require('express-validator')
const validationRules = () => {
  return [
    // username must be an email
    body('email').isEmail().withMessage('Email is invalid'),
    // password must be at least 5 chars long
    check('fullname').exists()
  ]
}


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  validationRules,
  validate,
}