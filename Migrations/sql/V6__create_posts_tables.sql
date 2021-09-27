-- Post
-- Title – text with up to 60 chars
-- Summary – text with up to 150 words
-- Body – text 
-- Author – the author of this post (the user which uploaded this post)
-- Community – the community this post belongs to (See community)
-- Likes – a number representing the number of likes this post got
-- Status – Pending approval/Approved. A post is in pending state until it’s approved by a moderator/super moderator. Once it’s approved it’s becomes publicly open (see Viewing + approving posts)
-- For the purpose of this exercise assume that the system needs to support tens of thousands of posts in the foreseeable future.



create table db_wisdo.posts (
  id bigserial primary key,
  title text null,
  summary text null,
  body text null,
  author_id bigint not null,
  community_id bigint not null,
  likes bigint default 0,
  status varchar(128) not null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null,
  foreign key (author_id) references db_wisdo.users(id) on delete cascade,
  foreign key (community_id) references db_wisdo.communities(id) on delete cascade
  );

create table db_wisdo_build.posts (
  id bigserial primary key,
  title text null,
  summary text null,
  body text null,
  author_id bigint not null,
  community_id bigint not null,
  likes bigint default 0,
  status varchar(128) not null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null,
  foreign key (author_id) references db_wisdo_build.users(id) on delete cascade,
  foreign key (community_id) references db_wisdo_build.communities(id) on delete cascade
  );
