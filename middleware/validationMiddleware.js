const Joi = require('joi');

const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(passwordPattern)
      .required()
      .messages({
        'string.pattern.base':
          'Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character.',
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

const validateRental = (req, res, next) => {
  const schema = Joi.object({
    customerName: Joi.string().min(3).required(),
    customerEmail: Joi.string().email().required(),
    carId: Joi.string().length(24).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    totalCost: Joi.number().min(1).required(),
    status: Joi.string().valid('active', 'completed').required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = { validateUser, validateLogin, validateRental };
