let mongoose = require('mongoose');
let server = require('./appWithTests');
let config = require('./config.js');

// TODO needs to be setup to handle production too
mongoose.connect(config.db.mongodb.development);
console.log(`Successfully connected to MongoDB. Starting web server...`);
server.start();
console.log(`Successfully started web server. Waiting for incoming connections...`);