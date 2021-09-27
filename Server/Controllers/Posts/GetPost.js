
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const PostService = require('../../Services/PostService');

module.exports = async (req, res) => {
   try {
    const postId = req.params.id;
     var result = await PostService.getPost(postId);
    if (!result) {
    return res.status(400).send(ResponseBuilder.buildErrorResponse(400, 'Internal server error', "No post was found"));
    }
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', result));
  } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};