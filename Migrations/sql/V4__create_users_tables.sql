
-- User

-- A user in the system. Each user should have following properties:
-- Name – text
-- Role – optional property for users with a role in the system. The system needs to support 2 roles - super moderator and moderator (see Features to implement). each user can only have 1 role.
-- Email - optional property for users with emails. Most moderators + super moderators have it but not all of them.
-- Image - url. This property is optional. For the purpose of this exercise you Don’t have to support image/video uploading and can assume it was already uploaded using a different system
-- Country – the country the user is from. You can assume this is always defined.
-- Communities – a user can belong to any number of communities.




create table db_wisdo.users (
  id bigserial primary key,
  name varchar(512) not null,
  role_id bigint null,
  email varchar(512) null,
  image varchar(512) null,
  country varchar(512) null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null,
  foreign key (role_id) references db_wisdo.roles(id) on delete set null
);

create table db_wisdo_build.users (
  id bigserial primary key,
  name varchar(512) not null,
  role_id bigint null,
  email varchar(512) null,
  image varchar(512) null,
  country varchar(512) null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null,
  foreign key (role_id) references db_wisdo_build.roles(id) on delete set null
);