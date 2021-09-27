create table db_wisdo.roles (
  id bigserial primary key,
  name varchar(60) not null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null
);

create table db_wisdo_build.roles (
  id bigserial primary key,
  name varchar(60) not null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null
);
