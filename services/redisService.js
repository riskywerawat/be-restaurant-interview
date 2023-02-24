const _ = require("underscore");
const axios = require("axios");
const config = require("../config/config");
const restPromise = require("request-promise");
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const { RedisSetExipredRequest } = require("../models/RedisSetExipredRequest");
const { RedisGetRequest } = require("../models/RedisGetRequest");

module.exports.setDataWithExpireTimeBySecond = async (key, value, expired) => {
  try {
    if (!key || !value || !expired) {
      throw new Error("setDataWithExpireTimeBySecond Invalid input");
    }
    let requestBody = new RedisSetExipredRequest(key, value, expired);
    requestBody.printRequest();
    const jsonRedisContent = {
      url: `${config.REDIS_SERVICE_HOST}/setRedisExpired`,
      body: requestBody,
    };
    let result = await axios.put(jsonRedisContent.url, jsonRedisContent.body);
    return result.data;
  } catch (error) {
    console.log("error >>>:: ", error);
  }
};

module.exports.getRedis = async (key) => {
  try {
    if (!key) {
      throw new Error("getRedis Invalid key");
    }
    let requestBody = new RedisGetRequest(key);
    requestBody.printRequest();
    const jsonRedisContent = {
      url: `${config.REDIS_SERVICE_HOST}/getRedis`,
      body: requestBody,
    };
    let result = await axios.post(jsonRedisContent.url, jsonRedisContent.body);
    return result.data;
  } catch (error) {
    console.log("error >>>:: ", error);
  }
};

module.exports.exists = async (key) => {
  try {
    if (!key) {
      throw new Error("exists Invalid key");
    }
    let requestBody = new RedisGetRequest(key);
    requestBody.printRequest();
    const jsonRedisContent = {
      url: `${config.REDIS_SERVICE_HOST}/exists`,
      body: requestBody,
    };
    let result = await axios.post(jsonRedisContent.url, jsonRedisContent.body);
    return result.data;
  } catch (error) {
    console.log("error >>>:: ", error);
  }
};
