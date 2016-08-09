'use strict';
require('./setGlobalVars.js');
let fs = require('fs');
let bodyParser = require('body-parser');

let express = require('express');
let app = express();
let routes = require('./routes/routes.js');

let config = require('./config.js');
// middleware
app.use(bodyParser.json());

// routes
app.use('/api/books', routes.books);



const PORT = process.env.PORT || config.server.port;
const start = () => {
  app.listen(PORT, () => {
    console.log(`Express server listening for requests at port ${config.server.port}`);
  });
};




module.exports = {start, app};
