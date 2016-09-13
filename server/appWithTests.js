'use strict';
require('./setGlobalVars.js');
let get = require('lodash/get')
let fs = require('fs');
let bodyParser = require('body-parser');
let path = require('path');
let winston = require('winston');
let expressWinston = require('express-winston');

let ENV = process.env.NODE_ENV
if (ENV === undefined) {
  console.log('UNDEFINED ENV!!!!!!');
}

global.logger = (a, b) => {
  console.log('-----------------------');
  console.log('-------------');
  console.log(a, b);
  console.log('-------------');
  console.log('-----------------------');
};

global.errorHandler = (req, res, errorMsg, statusCode) => {
  return res.status(statusCode).json({errorMessage: errorMsg});
};

let express = require('express');
let app = express();
let routes = require('./routes/routes.js');
let mongoose = require('mongoose');
let config = require('./config.js');

// Should be only used for dev and prod
const MONGO_DB_URL = process.env.MONGO_DB || config.db.mongodb[ENV];
const PORT = process.env.PORT || config.server.port[ENV];


// MIDDLEWARES
app.use(bodyParser.json());
app.use(require('express-fileupload')());

// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.Console({
//       json: true,
//       colorize: true
//     })
//   ],
//   // meta: true, // optional: control whether you want to log the meta data about the request (default to true)
//   msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//   expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//   colorize: true
// }))
app.use('/api/books', routes.books);
console.log(`Running under '${ENV}' environment`);
if (ENV === 'development') {
  let webpackConfig = require('../webpack.config.js');
  let webpack = require('webpack');
  let webpackDevMiddleware = require('webpack-dev-middleware');
  let webpackHotMiddleware = require('webpack-hot-middleware');
  let compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static('./dist'));
  app.use('/', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
  });

  console.log(`Connecting to Mongo db Url ${MONGO_DB_URL}`);
}




const start = () => {
  mongoose.connect(MONGO_DB_URL);
  app.listen(PORT, () => {
    console.log(`Express server listening for requests at port ${PORT}`);
    console.log('\n\n')
  });
};




module.exports = {start, app};
