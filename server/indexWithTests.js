let server = require('./appWithTests');


// TODO needs to be setup to handle production too
console.log(`Successfully connected to MongoDB. Starting web server...`);
server.start();
console.log(`Successfully started web server. Waiting for incoming connections...`);
