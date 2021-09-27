
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const PostService = require('../../Services/PostService');

module.exports = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const { post_id: postId, like } = req.body;
    var isLike = like && like.toString().toLowerCase() == 'true';
    await PostService.toggleLike(userId, postId, isLike);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', 'Post ' + (isLike ? 'liked':'disliked')));
   } catch (exp) {
     console.log(exp)
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};