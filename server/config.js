const config = {
  db: {
    mongodb: {
      development: 'mongodb://127.0.0.1:27017/bookScripterDevelopment',
      integrationTest: 'mongodb://127.0.0.1:27017/bookScripterIntegrationTests'
    }
  },
  logger: {
    api: 'logs/api.log',
    exception: 'logs/exception.log'
  },
  server: {
    port: 3000
  }
};

module.exports = config;