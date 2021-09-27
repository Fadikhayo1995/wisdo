module.exports = [
  {
    verb: "post",
    route: "/api/v1/users",
    controllerAction: "Users/CreateUser",
    middlewares: ["AccessToken", "UserValidator"]
  },
  {
    verb: "put",
    route: "/api/v1/users/:id",
    controllerAction: "Users/EditUser",
    middlewares: ["AccessToken", "UserValidator"]
  },
  {
    verb: "get",
    route: "/api/v1/users/:id",
    controllerAction: "Users/GetUser",
    middlewares: ["AccessToken"]
  },
  {
    verb: "get",
    route: "/api/v1/user-feed",
    controllerAction: "Users/GetUserFeed",
    middlewares: ["AccessToken", "UserID"]
  },
  {
    verb: "post",
    route: "/api/v1/communities",
    controllerAction: "Communities/CreateCommunity",
    middlewares: ["AccessToken", "CommunityValidator"]
  },
  {
    verb: "put",
    route: "/api/v1/communities/:id",
    controllerAction: "Communities/EditCommunity",
    middlewares: ["AccessToken", "CommunityValidator"]
  },
  {
    verb: "get",
    route: "/api/v1/communities/:id",
    controllerAction: "Communities/GetCommunity",
    middlewares: ["AccessToken"]
  },
  {
    verb: "post",
    route: "/api/v1/user/join-community",
    controllerAction: "Users/JoinCommunity",
    middlewares: ["AccessToken", "UserID"]
  },
  {
    verb: "put",
    route: "/api/v1/user/leave-community",
    controllerAction: "Users/LeaveCommunity",
    middlewares: ["AccessToken", "UserID", "CommunityID"]
  },
  {
    verb: "post",
    route: "/api/v1/posts",
    controllerAction: "Posts/CreatePost",
    middlewares: ["AccessToken", "UserID", "CommunityID", "PostValidator"]
  },
  {
    verb: "put",
    route: "/api/v1/posts/:id",
    controllerAction: "Posts/EditPost",
    middlewares: ["AccessToken", "UserID", "PostValidator"]
  },
  {
    verb: "get",
    route: "/api/v1/posts/:id",
    controllerAction: "Posts/GetPost",
    middlewares: ["AccessToken"]
  },
  {
    verb: "put",
    route: "/api/v1/posts-toggle-like",
    controllerAction: "Posts/ToggleLike",
    middlewares: ["AccessToken", "UserID"]
  },
  {
    verb: "put",
    route: "/api/v1/approve-post/:id",
    controllerAction: "Posts/ApprovePost",
    middlewares: ["AccessToken"]
  },
  {
    verb: "post",
    route: "/api/v1/problematic-words",
    controllerAction: "ProblematicWords/CreateWord",
    middlewares: ["AccessToken"]
  },
  {
    verb: "get",
    route: "/api/v1/problematic-words",
    controllerAction: "ProblematicWords/GetWords",
    middlewares: ["AccessToken"]
  },
];