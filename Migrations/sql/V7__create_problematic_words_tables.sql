-- Post
-- Title – text with up to 60 chars
-- Summary – text with up to 150 words
-- Body – text 
-- Author – the author of this post (the user which uploaded this post)
-- Community – the community this post belongs to (See community)
-- Likes – a number representing the number of likes this post got
-- Status – Pending approval/Approved. A post is in pending state until it’s approved by a moderator/super moderator. Once it’s approved it’s becomes publicly open (see Viewing + approving posts)
-- For the purpose of this exercise assume that the system needs to support tens of thousands of posts in the foreseeable future.



create table db_wisdo.problematic_words (
  id bigserial primary key,
  word varchar(512) not null unique,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null
  );

create table db_wisdo_build.problematic_words (
  id bigserial primary key,
  word varchar(512) not null unique,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null
  );
