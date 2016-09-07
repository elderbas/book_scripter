let mongoose = require('mongoose');
let server = require('./appWithTests');
let config = require('./config.js');

// Should be only used for dev and prod
process.env.MONGO_DB = config.db.mongodb.development;
process.env.PORT = config.server.port;




// TODO needs to be setup to handle production too
console.log(`Successfully connected to MongoDB. Starting web server...`);
server.start();
console.log(`Successfully started web server. Waiting for incoming connections...`);
