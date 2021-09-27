
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const CommunitiesService = require('../../Services/CommunitiesService');

module.exports = async (req, res) => {
   try {
    const data = req.body;
    const communityId = req.params.id;
    var result = await CommunitiesService.editCommunity(communityId, data);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', result));
   } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};