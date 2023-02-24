const config = require("../config/config");

 class RedisRequest {

  constructor() {
    this.host = config.REDIS_HOST;
    this.port = config.REDIS_POST;
    this.timeout = config.REQUEST_TIMEOUT_REDIS;
  }


  printRequest() {
    console.log(`${this.host}:${this.port} request_timeout:${this.timeout}`);
  }
}
module.exports = {RedisRequest}