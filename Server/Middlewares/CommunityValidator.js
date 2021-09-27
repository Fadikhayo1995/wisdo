const ResponseBuilder = require('../Utils/ResponseBuilder');
const CommunityValidator = require('../Validators/Community');
const Joi = require("joi");

module.exports = (req, res) => {
  const { error } = Joi.validate(req.body, CommunityValidator);
  if (error) {
    res.status(404).send(ResponseBuilder.buildErrorResponse(404, error.details));
    return false;
  }
  return true;
};