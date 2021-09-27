
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const UserService = require('../../Services/UserService');

module.exports = async (req, res) => {
   try {
    const userId = req.headers.user_id;
    const communityId = req.headers.community_id;
    await UserService.leaveCommunity(userId, communityId);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', "User was removed from community"));
  } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};