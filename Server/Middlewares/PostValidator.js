const ResponseBuilder = require('../Utils/ResponseBuilder');
const PostValidator = require('../Validators/Post');
const Joi = require("joi");

module.exports = (req, res) => {
  const { error } = Joi.validate(req.body, PostValidator);
  if (error) {
    res.status(404).send(ResponseBuilder.buildErrorResponse(404, error.details));
    return false;
  }
  return true;
};