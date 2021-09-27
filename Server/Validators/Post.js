const Joi = require("joi");
module.exports = Joi.object().keys({
  id: Joi.number().optional().allow(null),
  title: Joi.string().optional().allow(null),
  summary: Joi.string().optional().allow(null),
  body: Joi.string().optional().allow(null),
  author_id: Joi.number().optional().allow(null),
  community_id: Joi.number().optional().allow(null),
  status: Joi.string().optional().allow(null),
});
