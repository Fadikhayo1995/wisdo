
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const UserService = require('../../Services/UserService');

module.exports = async (req, res) => {
   try {
    const data = req.body;
    var result = await UserService.createUser(data);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', result));
   } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};