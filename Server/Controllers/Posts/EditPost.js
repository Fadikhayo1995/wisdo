
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const PostService = require('../../Services/PostService');

module.exports = async (req, res) => {
   try {
    const data = req.body;
    const userId = req.headers.user_id;
    const postId = req.params.id;
    var result = await PostService.editPost(userId, postId, data);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', result));
   } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};