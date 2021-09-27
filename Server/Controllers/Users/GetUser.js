
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const UserService = require('../../Services/UserService');

module.exports = async (req, res) => {
   try {
    const userId = req.params.id;
     var result = await UserService.getUser(userId);
    if (!result) {
      return res.status(400).send(ResponseBuilder.buildErrorResponse(400, 'Internal server error', "No user was found"));
    }
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', result));
  } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};