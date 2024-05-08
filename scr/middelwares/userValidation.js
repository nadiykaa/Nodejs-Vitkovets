const Joi = require('joi');
const { statusCode } = require('../helpers/constants');

const validate = (schema, body, next) => {
  if (Object.keys(body).length === 0) {
    return next({
      status: statusCode.BAD_REQUEST,
      message: 'Missing fields',
    });
  }
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: statusCode.BAD_REQUEST,
      message: `${message.replace(/"/g, '')}`,
    });
  }
  next();
};

const schemaCreateUser = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp(/^\d{10}$/)).required(),
  age: Joi.number().integer().min(18).max(120).required()
});

const schemaUpdateUser = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(new RegExp(/^\d{10}$/)),
  age: Joi.number().integer().min(18).max(120)
});

const validateCreateUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

const validateUpdateUser = (req, res, next) => {
  return validate(schemaUpdateUser, req.body, next);
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};
