const config = {
  db: {
    mongodb: {
      development: 'mongodb://127.0.0.1:27017/bookScripterDevelopment',
      integrationTest: 'mongodb://127.0.0.1:27017/bookScripterIntegrationTests',
      acceptanceTests: 'mongodb://127.0.0.1:27017/bookScripterAcceptanceTests',
      test: 'mongodb://127.0.0.1:27017/bookScripterAcceptanceTests',
    }
  },
  logger: {
    api: 'logs/api.log',
    exception: 'logs/exception.log'
  },
  server: {
    port: {
      development: '3000',
      test: '3333'
    }
  }
};

module.exports = config;