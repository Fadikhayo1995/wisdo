
create table db_wisdo.users_likes (
  id bigserial primary key,
  user_id bigint not null,
  post_id bigint not null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null,
  foreign key (user_id) references db_wisdo.users(id) on delete cascade,
  foreign key (post_id) references db_wisdo.posts(id) on delete cascade,
  unique(user_id, post_id)
);

create table db_wisdo_build.users_likes (
  id bigserial primary key,
  user_id bigint not null,
  post_id bigint not null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null,
  foreign key (user_id) references db_wisdo_build.users(id) on delete cascade,
  foreign key (post_id) references db_wisdo_build.posts(id) on delete cascade,
  unique(user_id, post_id)
);