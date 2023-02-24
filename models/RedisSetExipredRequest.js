

const {RedisRequest} = require("./RedisRequest");
const config = require("../config/config");

 class RedisSetExipredRequest extends RedisRequest {
  constructor(key,value,expired) {
    super();
    this.key = key;
    this.value = value
    this.expired = expired;
    console.log("expired", expired);
  }
 
}
module.exports = {RedisSetExipredRequest}