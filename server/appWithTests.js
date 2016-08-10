'use strict';
require('./setGlobalVars.js');
let fs = require('fs');
let bodyParser = require('body-parser');

let express = require('express');
let app = express();
let routes = require('./routes/routes.js');
let mongoose = require('mongoose');
let config = require('./config.js');
// middleware
app.use(bodyParser.json());
app.use(require('express-fileupload')());

// routes
app.use('/api/books', routes.books);
app.get('/', (req, res) => {
  res.send('yay')
});


const start = () => {
  mongoose.connect(process.env.MONGO_DB);
  app.listen(process.env.PORT, () => {
    console.log(`Express server listening for requests at port ${config.server.port}`);
    console.log('\n\n')
  });
};




module.exports = {start, app};
