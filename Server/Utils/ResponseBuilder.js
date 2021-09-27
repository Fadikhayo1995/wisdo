module.exports = {
  buildSuccessResponse: (code = 200, message = "Success", content) => {
    return {
      "code": code,
      "message": message,
      "content": content
    };
  },

  buildErrorResponse: (code = 200, message = "Error", content) => {
    return {
      "code": code,
      "message": message,
      "content": content
    };
  }
};