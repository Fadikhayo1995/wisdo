
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const UserService = require('../../Services/UserService');

module.exports = async (req, res) => {
   try {
    const userId = req.headers.user_id;
     const page = req.query.page || 1;
     const limit = req.query.limit || 20;
    var result = await UserService.getUserFeed(userId, page, limit);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', result));
   } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};