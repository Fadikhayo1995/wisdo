const QueryRunner = require('../Utils/QueryRunner');
const SQLStringUtil = require('../Utils/SQLStringUtil');
 
module.exports = {
  createUser: async function (user) {
    var { name, role_id: roleId, email, image, country } = user;
    name = SQLStringUtil.nullifyString(name); 
    roleId = SQLStringUtil.nullifyString(roleId); 
    email = SQLStringUtil.nullifyString(email); 
    image = SQLStringUtil.nullifyString(image); 
    country = SQLStringUtil.nullifyString(country); 

    var query = `
    INSERT INTO db_wisdo.users
      (name, role_id, email, image, country)
    VALUES
      (${name},${roleId},${email},${image},${country})
    RETURNING *;`;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows && result.rows.length && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  editUser: async function (userId, user) {
    var rows = ['name', 'role_id', 'email', 'image', 'country'];
    var updateColumns = [`updated_at = timezone('asia/jerusalem',now())`];
    rows.forEach(item => {
      if (user.hasOwnProperty(item)) {
        updateColumns.push(`${item} = ${SQLStringUtil.nullifyString(user[item])}`);
      }
    });
    var query = `
    UPDATE
      db_wisdo.users
    SET
      ${updateColumns.join(',')}
    WHERE
      id = ${userId}
    RETURNING *`;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows && result.rows.length && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  deleteUser: async function (userId) {
    var query = ` 
    UPDATE
      db_wisdo.users
    SET
      deleted_at = timezone('asia/jerusalem', now())
    WHERE
      id = ${userId}`;
    try {
      await QueryRunner.runQuery(query);
      return Promise.resolve();
    } catch (exp) {
      console.log(exp);
      return Promise.reject(exp);
    }
  },
  getUser: async function (userId) {
    var query = `
    SELECT
      u.id,
      u.name,
      u.image,
      u.country,
      u.role_id,
      json_agg(c.*) as communities
    FROM
      db_wisdo.users u
    LEFT JOIN db_wisdo.users_communities uc on
      uc.user_id = u.id
      and uc.deleted_at is null
    LEFT JOIN db_wisdo.communities c on
      uc.community_id = c.id
      and c.deleted_at is null
    WHERE
      u.id = ${userId}
      AND u.deleted_at is null
    GROUP BY
      u.id,
      u.name,
      u.image,
      u.country,
      u.role_id`;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows && result.rows.length && result.rows[0]);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  joinCommunity: async function (userId, communityId) {
    var query = ` 
    INSERT INTO
      db_wisdo.users_communities
        (user_id, community_id)
    VALUES
        (${userId}, ${communityId})
    ON CONFLICT ON CONSTRAINT
      users_communities_user_id_community_id_key
        do update set
          updated_at = timezone('asia/jerusalem'::text, now()),
          deleted_at = null`;
    try {
      await QueryRunner.runQuery(query);
      return Promise.resolve();
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  leaveCommunity: async function (userId, communityId) {
    var query = ` 
    UPDATE
      db_wisdo.users_communities
    SET
      deleted_at = timezone('asia/jerusalem'::text, now())
    WHERE
      user_id = ${userId}
      and community_id = ${communityId}`;
    try {
      await QueryRunner.runQuery(query);
      return Promise.resolve();
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  checkIfUserInCommunity: async function (userId, communityId) {
    var query = ` 
    SELECT
      *
    FROM
      db_wisdo.users_communities
    WHERE
      user_id = ${userId}
      AND community_id = ${communityId}
      AND deleted_at is null`;
    try {
      var result = await QueryRunner.runQuery(query);
      if (result && result.rows && result.rows.length > 0) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    } catch (exp) {
      return Promise.reject(exp);
    }
  },
  getUserFeed: async function (userId, page, limit) {
    const offset = (page - 1) * limit;
    var query = `
    with posts_likes as (
      SELECT
        p.id,
        p.title ,
        p.summary ,
        p.body,
        p.status ,
        p.author_id,
        p.community_id,
        coalesce(count(distinct ul.id),0) as likes
      FROM
        db_wisdo.posts p
      LEFT JOIN db_wisdo.users_Likes ul on
        ul.post_id = p.id
        and ul.deleted_at is null
      WHERE
        p.deleted_at is null
        AND p.status = 'approved'
      GROUP BY
        p.id,
        p.title ,
        p.summary ,
        p.body,
        p.community_id,
        p.status ,
        p.author_id 
    )
    SELECT
      p.*
    FROM
      db_wisdo.users u
    INNER JOIN
      db_wisdo.users_communities uc on
        uc.user_id = u.id
        and uc.deleted_at is null
    INNER JOIN
      posts_likes p on
        p.community_id = uc.community_id
    INNER JOIN
      db_wisdo.users au on
        au.id= p.author_id
        and au.deleted_at is null
    WHERE
      u.id = ${userId}
    ORDER BY
      (case when lower(trim(u.country)) = lower(trim(u.country)) then 0 else 1 end) asc,
      ((0.8 * p.likes) + (0.2 * length(p.body))) desc 
    LIMIT ${limit} OFFSET ${offset}`;
    try {
      var result = await QueryRunner.runQuery(query);
      return Promise.resolve(result && result.rows);
    } catch (exp) {
      return Promise.reject(exp);
    }
  }
};