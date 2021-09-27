
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const UserService = require('../../Services/UserService');

module.exports = async (req, res) => {
   try {
    const userId = req.params.id;
    await UserService.deleteUser(userId);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', null));
  } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};