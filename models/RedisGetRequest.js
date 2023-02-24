
const {RedisRequest} = require("./RedisRequest");
const config = require("../config/config");

 class RedisGetRequest extends RedisRequest {
  constructor(key) {
    super();
    this.key = key;
  }
}
module.exports = {RedisGetRequest}