const _ = require("underscore");
const axios = require("axios");
const config = require("../config/config");
const restPromise = require("request-promise");
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const { RedisSetExipredRequest } = require("../models/RedisSetExipredRequest");
const { RedisGetRequest } = require("../models/RedisGetRequest");


module.exports.getApiKey = async () => {
  try {

    return process.env.API_KEY
  } catch (error) {
    console.log("error >>>:: ", error);
  }
};
