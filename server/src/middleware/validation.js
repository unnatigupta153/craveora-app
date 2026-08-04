const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(100).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(100).required()
});

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  req.body = value;
  next();
};

module.exports = { validateSignup: validate(signupSchema), validateLogin: validate(loginSchema) };
