const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const Environment = require('./Configuration/Environment/AppEnv');


app.use(express.json());
app.use(cors());

var server = app.listen(process.env.PORT || Environment.SERVER_PORT, function () {
  var address = server.address().address;
  var port = server.address().port;
  console.log("serving at =>   " + address + ":" + port);
});

server.setTimeout(0);

var Routes = require('./Configuration/Http/RoutesInitializer');
Routes.initRoutes(router);
app.use('/', router);


