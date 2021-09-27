const Joi = require("joi");
module.exports = Joi.object().keys({
  id:Joi.number().optional().allow(null),
  title: Joi.string().optional().allow(null),
  image: Joi.string().optional().allow(null),
});
