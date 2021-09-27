const QueryRunner = require('../Utils/QueryRunner');
const SQLStringUtil = require('../Utils/SQLStringUtil');
 
module.exports = {
  createCommunity: async function (community) {
    var { title,  image } = community;
    title = SQLStringUtil.nullifyString(title); 
    image = SQLStringUtil.nullifyString(image);
    
    var query = `
    INSERT INTO
      db_wisdo.communities
        (title, image)
      VALUES
        (${title}, ${image})
    RETURNING *;`;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows && result.rows.length && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  editCommunity: async function (communityId, community) {
    var rows = ['title', 'image'];
    var updateColumns = [`updated_at = timezone('asia/jerusalem',now())`];
    rows.forEach(item => {
      if (community.hasOwnProperty(item)) {
        updateColumns.push(`${item} = ${SQLStringUtil.nullifyString(community[item])}`);
      }
    });
    var query = `
    UPDATE
      db_wisdo.communities
    SET
      ${updateColumns.join(',')}
    WHERE
      id = ${communityId}
    RETURNING *`;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows && result.rows.length && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  deleteCommunity: async function (communityId) {
    var query = `
    UPDATE
      db_wisdo.communities
    SET
      deleted_at = timezone('asia/jerusalem',now())
    WHERE
      id = ${communityId}`;
    try {
      await QueryRunner.runQuery(query);
      return Promise.resolve();
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  getCommunity: async function (communityId) {
    var query = `
    SELECT
      c.id,
      c.title,
      c.image ,
      c.created_at,
      count(distinct uc.id) as member_count
    FROM
      db_wisdo.communities c
    LEFT JOIN
       db_wisdo.users_communities uc ON uc.community_id = c.id and uc.deleted_at is null
    WHERE
      c.id = ${communityId}
      and c.deleted_at is null
    GROUP BY
      c.id,
      c.title,
      c.image ,
      c.created_at
      `;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows && result.rows.length && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  getCommunityModerators: async function (communityId) {
    var query = `
    SELECT
      u.email
    FROM
      db_wisdo.users_communities uc
    INNER JOIN 
      db_wisdo.users u on
        u.id = uc.user_id
        and u.deleted_at is null
    INNER JOIN
      db_wisdo.roles r on
        u.role_id = r.id
        and r.deleted_at is null
        and r.name in ('moderator','super_moderator')
    WHERE
      uc.deleted_at is null
      AND uc.community_id = ${communityId}`;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows);
    } catch (exp) {
      return Promise.reject(exp);
    }
  }
};