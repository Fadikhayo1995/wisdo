const QueryRunner = require('../Utils/QueryRunner');
const SQLStringUtil = require('../Utils/SQLStringUtil');
 
module.exports = {
  createWord: async function (word) {
    word = SQLStringUtil.nullifyString(word); 
  
    var query = `
    INSERT INTO
      db_wisdo.problematic_words
        (word)
    VALUES
        (${word});`;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows && result.rows.length && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },

  getWords: async function (page, limit) {
    const offset = (page - 1) * limit;
    var query = `
    SELECT
      *
    FROM
      db_wisdo.problematic_words
    LIMIT ${limit} OFFSET ${offset}
    `;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
};