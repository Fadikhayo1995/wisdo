const ControllersPath = '../../Server/Controllers/';
const MiddlewaresPath = '../../Server/Middlewares/';

var routeHandler = function (req, res, controllerAction, middlewares) {
  next = true;
  for (index = 0; index < middlewares.length; index++) {
    if (!middlewares[index](req, res)) {
      next = false;
      break;
    }
  }
  if (next)
    controllerAction(req, res);
};

module.exports = {
  initRoutes: function (app) {
    var routes = require('./Routes');

    routes.forEach((route) => {
      var controllerAction = require(ControllersPath + route.controllerAction);
      var middlewares = route.middlewares.map((middleware) => {
        return require(MiddlewaresPath + middleware);
      });
      switch (route.verb) {
        case 'get':
          app.get(route.route, (req, res) => {
            routeHandler(req, res, controllerAction, middlewares)
          });
          break;
        case 'post':
          app.post(route.route, (req, res) => {
            routeHandler(req, res, controllerAction, middlewares);
          });
          break;
        case 'put':
          app.put(route.route, (req, res) => {
            routeHandler(req, res, controllerAction, middlewares)
          });
          break;
        case 'delete':
          app.delete(route.route, (req, res) => {
            routeHandler(req, res, controllerAction, middlewares)
          });
          break;
      }
    });
  }
}
