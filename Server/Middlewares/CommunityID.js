const environment = require('../../Configuration/Environment/AppEnv')
const ResponseBuilder = require('../Utils/ResponseBuilder');

module.exports = (req, res) => {
  if (!req.headers.community_id) {
    res.status(404).send(ResponseBuilder.buildErrorResponse(404, "Unauthorized", "Missing community id"));
    return false;
  }
  return true;
};