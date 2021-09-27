const ResponseBuilder = require('../Utils/ResponseBuilder');
const UserValidator = require('../Validators/User');
const Joi = require("joi");

module.exports = (req, res) => {
  const { error } = Joi.validate(req.body, UserValidator);
  if (error) {
    res.status(404).send(ResponseBuilder.buildErrorResponse(404, error.details));
    return false;
  }
  return true;
};