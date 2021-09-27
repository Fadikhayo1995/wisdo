const environment = require('../../Configuration/Environment/AppEnv')
const ResponseBuilder = require('../Utils/ResponseBuilder');

module.exports = (req, res) => {
  if (!req.query.access_token || (req.query.access_token != environment.ACCESS_TOKEN)) {
    res.status(404).send(ResponseBuilder.buildErrorResponse(404, "Unauthorized", "Access Token missing or incorrect"));
    return false;
  }
  return true;
};