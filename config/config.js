const dotenv = require("dotenv").config();

module.exports = {
  // MONGODB_URI: process.env.MONGODB_URI,
  NODE_PORT: process.env.NODE_PORT,
  API_KEY: process.env.API_KEY,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_POST: process.env.REDIS_POST,
  REQUEST_TIMEOUT_REDIS: process.env.REQUEST_TIMEOUT_REDIS,
  EXIPRED_REDIS: process.env.EXIPRED_REDIS,
  REDIS_SERVICE_HOST:process.env.REDIS_SERVICE_HOST
  // DOMAIN:process.env.DOMAIN,
  //JWT_SECRET:process.env.JWT_SECRET
};
