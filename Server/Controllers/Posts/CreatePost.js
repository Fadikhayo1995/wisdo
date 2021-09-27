
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const PostService = require('../../Services/PostService');
const UserService = require('../../Services/UserService');

module.exports = async (req, res) => {
   try {
    const data = req.body;
    const communityId = req.headers.community_id;
    const userId = req.headers.user_id;
    var isInCommunity = await UserService.checkIfUserInCommunity(userId, communityId);
     
    if (!isInCommunity) {
      return res.status(400).send(ResponseBuilder.buildErrorResponse(400, 'User does not belog to this community', null));
    }

    var result = await PostService.createPost(userId,communityId, data);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', result));
   } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};