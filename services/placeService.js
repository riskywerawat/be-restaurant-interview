const _ = require("underscore");
const axios = require("axios");
const config = require("../config/config");
const restPromise = require("request-promise");
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

/**
 * textSearch
 * ใช้สำหรับ search ข้อมูล
 */

module.exports.textSearch = (keyword) => {
  return new Promise(async (res, rej) => {
    var ret = {};
    var option = {
      uri: "https://maps.googleapis.com/maps/api/place/textsearch/json",
      qs: {
        key: config.API_KEY,
        query: `${keyword}+ร้านอาหาร`,
        language: "th",

        rankby: "prominence",
      },
    };

    restPromise(option)
      .then((result) => {
        var data = JSON.parse(result);
        console.info(JSON.stringify(data));
        for (let i = 0; i < data.results.length; i++) {
          if (!data.results[i].opening_hours) {
            data.results[i].opening_hours = "ไม่มีข้อมูล";
          } else if (data.results[i].opening_hours === false) {
            data.results[i].opening_hours = "ปิด";
          } else {
            data.results[i].opening_hours = "เปิดอยู่";
          }
        }
        var results = data.results.map((result) => {
          return {
            status: result.opening_hours,
            name: result.name,
            place_id: result.place_id,
            rating: result.rating ? result.rating : 0,
            address: result.formatted_address,
            geometry:result.geometry,
            photo: result.photos ? result.photos[0].photo_reference : [],
          };
        });
        ret.status = true;
        ret.data = results;
        res(ret);
      })
      .catch((error) => {
        console.log(error);
        ret.status = false;
        ret.massage = error.massage;
        rej(ret);
      });
  });
};
/**
 * placeDetail
 * ใช้สำหรับดึงข้อมูล รายระเอียดของข้องมูล สถานที่
 *  โดยระบุ fields ตามที่ต้องการได้
 */
module.exports.placeDetail = (place_id) => {
  return new Promise((res, rej) => {
    var ret = {};
    const option = {
      uri: "https://maps.googleapis.com/maps/api/place/details/json",
      qs: {
        place_id: place_id,
        fields:
          "name,formatted_address,user_ratings_total,formatted_phone_number,website,opening_hours,website,review,rating,place_id,geometry",
        language: "th",
        key: config.API_KEY,
      },
    };

    restPromise(option)
      .then((result) => {
        ret.status = true;
        ret.data = JSON.parse(result);
        JSON.stringify(result);
        res(ret);
      })
      .catch((error) => {
        console.log(error);
        ret.status = false;
        ret.massage = error.massage;
        rej(ret);
      });
  });
};
/**
 * placePhotoreFerence
 * ใช้สำหรับดึงรูปภาพจาก google โดยใช้  photoreference
 *
 */
module.exports.placePhotoreFerence = (photo_code, maxwidth) => {
  return new Promise((res, rej) => {
    var ret = {};
    // eslint-disable-next-line promise/catch-or-return
    fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photo_code}
        &key=${config.API_KEY}`
    )
      .then((result) => {
        const data = _.clone(result);
        ret.status = true;
        ret.data = data.url;
        JSON.stringify(result);
        res(ret);
      })
      .catch((error) => {
        console.log(error);
        ret.status = false;
        ret.massage = error.massage;
        rej(ret);
      });
  });
};
