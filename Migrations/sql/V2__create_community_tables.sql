create table db_wisdo.communities (
  id bigserial primary key,
  title varchar(60) not null,
  image varchar(512) null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null
);

create table db_wisdo_build.communities (
  id bigserial primary key,
  title varchar(60) not null,
  image varchar(512) null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null
)