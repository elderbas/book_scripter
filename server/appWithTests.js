'use strict';
require('./setGlobalVars.js');
let get = require('lodash/get')
let fs = require('fs');
let bodyParser = require('body-parser');
let path = require('path');


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

// middleware
// app.use(bodyParser.json());
// app.use(require('express-fileupload')());


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
}

// Should be only used for dev and prod
// process.env.MONGO_DB = config.db.mongodb[ENV];
process.env.PORT = config.server.port[ENV];
/* Webpacky stuff */


// routes
// app.use('/api/books', routes.books);

// webpacky output



const start = () => {
  // mongoose.connect(process.env.MONGO_DB);
  app.listen(process.env.PORT, () => {
    console.log(`Express server listening for requests at port ${process.env.PORT}`);
    console.log('\n\n')
  });
};




module.exports = {start, app};
