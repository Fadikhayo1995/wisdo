const environment = require('../../Configuration/Environment/AppEnv')
const ResponseBuilder = require('../Utils/ResponseBuilder');

module.exports = (req, res) => {
  if (!req.headers.user_id) {
    res.status(404).send(ResponseBuilder.buildErrorResponse(404, "Unauthorized", "Missing user id"));
    return false;
  }
  return true;
};