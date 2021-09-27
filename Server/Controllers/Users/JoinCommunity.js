
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const UserService = require('../../Services/UserService');

module.exports = async (req, res) => {
   try {
    const userId = req.headers.user_id;
    const communityId = req.body.community_id;
    if (!communityId || communityId.toString().trim() == '') {
    return res.status(400).send(ResponseBuilder.buildErrorResponse(400, 'missing community id', null));
    }
    await UserService.joinCommunity(userId, communityId);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', "User was added to community"));
  } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};