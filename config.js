const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  swagger:{
    url: process.env.SWAGGER_URL || 'localhost',
    port : process.env.SWAGGER_PORT || '8080',
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/washer-api'
  }
};

module.exports = config;
