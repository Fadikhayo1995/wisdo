const Joi = require("joi");
module.exports = Joi.object().keys({
  id:Joi.number().optional().allow(null),
  name: Joi.string().optional().allow(null),
  email: Joi.string().optional().allow(null),
  image: Joi.string().optional().allow(null),
  country: Joi.string().optional().allow(null),
});
