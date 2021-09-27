
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const CommunitiesService = require('../../Services/CommunitiesService');

module.exports = async (req, res) => {
   try {
    const communityId = req.params.id;
    await CommunitiesService.deleteCommunity(communityId);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', null));
  } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};