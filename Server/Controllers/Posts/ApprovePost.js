
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const PostService = require('../../Services/PostService');

module.exports = async (req, res) => {
   try {
    const postId = req.params.id;
    await PostService.approvePost(postId);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', 'post was approved'));
   } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};