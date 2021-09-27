
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const WordsService = require('../../Services/WordsService');

module.exports = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    var result = await WordsService.getWords(page, limit);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', result));
  } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};