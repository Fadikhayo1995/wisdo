environment = {};

if (process.env.NODE_ENV == "development") {
  environment = require('./development');
} else if (process.env.NODE_ENV == "production") {
  environment = require('./production');
} else {
  environment = require('./local');
}

module.exports = environment;