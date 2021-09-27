
create table db_wisdo.users_communities (
  id bigserial primary key,
  user_id bigint not null,
  community_id bigint not null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null,
  foreign key (user_id) references db_wisdo.users(id) on delete cascade,
  foreign key (community_id) references db_wisdo.communities(id) on delete cascade,
  unique(user_id, community_id)
);


create table db_wisdo_build.users_communities (
  id bigserial primary key,
  user_id bigint not null,
  community_id bigint not null,
  created_at timestamp default timezone('asia/jerusalem', now()),
  updated_at timestamp default null,
  deleted_at timestamp default null,
  foreign key (user_id) references db_wisdo_build.users(id) on delete cascade,
  foreign key (community_id) references db_wisdo_build.communities(id) on delete cascade,
  unique(user_id, community_id)
);