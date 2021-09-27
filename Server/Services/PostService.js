const QueryRunner = require('../Utils/QueryRunner');
const SQLStringUtil = require('../Utils/SQLStringUtil');
const CommunitiesService = require('./CommunitiesService');
const SendEmail = require('../Utils/SendMail');
const StringUtils = require('../Utils/StringUtils');
const environment = require('../../Configuration/Environment/AppEnv');

module.exports = {
  createPost: async function(userId, communityId, post)  {
    var { title, summary, body } = post;
    summary = summary || StringUtils.getFirstNWords(100, body);
    title = SQLStringUtil.nullifyString(title);
    body = SQLStringUtil.nullifyString(body);
    summary = SQLStringUtil.nullifyString(summary);
    var query = `
    INSERT INTO db_wisdo.posts
      (title, summary, body, author_id, community_id, status)
    VALUES
      (${title}, ${summary}, ${body}, ${userId}, ${communityId}, 'pending')
    RETURNING *;`;
    try {
      var result = await QueryRunner.runQuery(query);
      var uploadedPost = result && result.rows && result.rows[0];
      this.checkWatchlist(uploadedPost);
      return Promise.resolve(result && result.rows && result.rows.length && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  
  editPost: async function (userId, postId, post) {
    var rows = ['title', 'summary', 'body', 'status'];
    var updateColumns = [`updated_at = timezone('asia/jerusalem',now())`];
    rows.forEach(item => {
      if (post.hasOwnProperty(item)) {
        updateColumns.push(`${item} = ${SQLStringUtil.nullifyString(post[item])}`);
      }
    });
    var query = `
    UPDATE
      db_wisdo.posts
    SET
      ${updateColumns.join(',')}
    WHERE
      id = ${postId}
      and author_id = ${userId}
    RETURNING *`;

    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows && result.rows.length && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  checkWatchlist: async function (post) {
    const { community_id: communityId, body, id: postId } = post;
    var query = ` 
    SELECT
      count(distinct pw.id) as number_of_matches
    FROM
      db_wisdo.posts p
    INNER JOIN
      db_wisdo.problematic_words pw on p.body ilike CONCAT('%',pw.word,'%') 
    WHERE
      p.id = ${postId}`;
    try {
      const result = await QueryRunner.runQuery(query);
      const numberOfMatches = result && result.rows && result.rows[0] && result.rows[0].number_of_matches;
      if (!numberOfMatches || numberOfMatches == 0)
        return Promise.resolve(null);
      await this.sendEmailToModerators(communityId, postId);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  sendEmailToModerators: async function (communityId, postId) {
    try {
      var emails = await CommunitiesService.getCommunityModerators(communityId);
      var apiUrl = `http://localhost:8020/api/v1/posts/${postId}?access_token=${environment.ACCESS_TOKEN}`;
      await SendEmail(emails, 'Post with problematic words', `To check this post use ${apiUrl}` );
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  getPost: async function (postId) {
    var query = `
    SELECT
      *
    FROM
      db_wisdo.posts p
    WHERE
      p.id = ${postId}`;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  toggleLike: async function (userId, postId, like) {
    const deletedAtColumn = like ? 'NULL' : `timezone('asia/jerusalem',now())`;
    var query = ` 
    INSERT INTO
      db_wisdo.users_likes
        (user_id, post_id, deleted_at)
    VALUES
        (${userId}, ${postId}, ${deletedAtColumn})
    ON CONFLICT ON CONSTRAINT
      users_likes_user_id_post_id_key
        DO UPDATE SET
          deleted_at = ${deletedAtColumn}`;
    try {
      await QueryRunner.runQuery(query);
      return Promise.resolve();
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  approvePost: async function (postId) {
    var query = `
    UPDATE
      db_wisdo.posts
    SET
      updated_at = timezone('asia/jerusalem',now()),
      status = 'approved'
    WHERE
      id = ${postId}`;
    try {
      await QueryRunner.runQuery(query);
      return Promise.resolve();
    } catch (exp) {
      return Promise.reject(exp);
    }
  }
};