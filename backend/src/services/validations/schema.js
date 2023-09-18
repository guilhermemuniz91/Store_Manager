const Joi = require('joi');

const addNameSchema = Joi.object({
  name: Joi.string().min(3),
});

module.exports = { addNameSchema };