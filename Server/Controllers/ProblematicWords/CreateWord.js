
const ResponseBuilder = require('../../Utils/ResponseBuilder');
const WordsService = require('../../Services/WordsService');

module.exports = async (req, res) => {
  const word = req.body.word;
  if (!word || word.toString().trim() == '' ) {
   return res.status(400).send(ResponseBuilder.buildErrorResponse(400, 'invalid word', null));
  }
  try {
    var result = await WordsService.createWord(word);
    return res.status(200).send(ResponseBuilder.buildErrorResponse(200, 'success', result));
  } catch (exp) {
    return res.status(500).send(ResponseBuilder.buildErrorResponse(500, 'Internal server error', exp));
  }
};