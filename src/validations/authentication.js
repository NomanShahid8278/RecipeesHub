const Joi = require("@hapi/joi");

const userRegister = Joi.object({
  username: Joi.string().min(6).required(),
  fullname: Joi.string().min(6).required(),
  age: Joi.number(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

const login = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

const forgot_Password = Joi.object({
  email: Joi.string().required().email(),
});

const reset_Password = Joi.object({
  password: Joi.string().min(8).required(),
  userId: Joi.string().required(),
  resetToken: Joi.string().required(),
});

module.exports = {
  userRegister,
  login,
  forgot_Password,
  reset_Password,
};
