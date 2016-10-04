'use strict';
require('./setGlobalVars.js');
let get = require('lodash/get')
let fs = require('fs');
let bodyParser = require('body-parser');
let path = require('path');

// turns on file log writing for specific blocks of code
// do a global text search for _.get(global, 'log.<key>') to find it
// tail -f server/log/<key>.txt
// WARNING - using writeFileSync and some of these are really slow
global.log = {
  preSnippetClassify: true, // will notice a difference
  getNameSuggestion: true, // reasonably quick
  checkArrangementForMatches: true,
  googleNameSuggestion: true,
  // classifyPreSnippetArrangement: true
}

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
  return res.status(statusCode).send({errorMessage: errorMsg});
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
