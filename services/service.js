
const _ = require("underscore");
const axios = require('axios');
const config = require('../config/config');
const restPromise = require("request-promise");

const dotenv = require('dotenv').config();

module.exports.textSearch = (keyword) => {


    return new Promise(async (res, rej) => {
      var ret = {};
      var option = {
        uri: "https://maps.googleapis.com/maps/api/place/textsearch/json",
        qs: {
          key: config.API_KEY,
          query:  `${keyword}+ร้านอาหาร`,
          language: "th",
          opennow:true,
          rankby: "prominence"
        }
      };

      restPromise(option)
        .then(result => {
          var data = JSON.parse(result);
          console.info(JSON.stringify(data));
          for (let i = 0; i < data.results.length; i++) {
            if (!data.results[i].opening_hours) {
              data.results[i].opening_hours = "ไม่มีข้อมูล";
            } else if(data.results[i].opening_hours===false){
              data.results[i].opening_hours = "ปิด";
            } else {
              data.results[i].opening_hours = "เปิดอยู่";
            }
          }
          var results = data.results.map(result => {
            return {
              status: result.opening_hours,
              name: result.name,
              place_id: result.place_id,
              rating: result.rating ? result.rating : 'ยังไม่มีการให้คะแนน',
              address: result.formatted_address,
              //ดักกรณีที่ไม่ม่รูปด้วย
              photo: result.photos ? result.photos[0].photo_reference : []
            };
          });
          ret.status = true;
          ret.data = results;
          res(ret);
        })
        .catch(error => {
          console.log(error);
          ret.status = false;
          ret.massage = error.massage;
          rej(ret);
        });
    });
  };
  
  module.exports.PlaceDetail = place_id => {
    return new Promise((res, rej) => {
      var ret = {};
      const option = {
        uri: "https://maps.googleapis.com/maps/api/place/details/json",
        qs: {
          place_id: place_id,
          fields: "name,formatted_address,user_ratings_total,formatted_phone_number,website,opening_hours,website,review,rating,place_id,geometry",
          language: "th",
          key: configGoogle.key_place
        }
      };

      restPromise(option)
        .then(result => {
          ret.status = true;
          ret.data = JSON.parse(result);
          JSON.stringify(result)
          res(ret);
        })
        .catch(error => {
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
  module.exports.placePhotoreFerence = photo_code => {
    return new Promise((res, rej) => {
      var ret = {};
      // eslint-disable-next-line promise/catch-or-return
      fetch(
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${photo_code}
        &key=${configGoogle.key_place}`
        )
        .then(result => {
          const data = _.clone(result);
          ret.status = true;
          ret.data = data.url;
          JSON.stringify(result)
          res(ret);
        })
        .catch(error => {
          console.log(error);
          ret.status = false;
          ret.massage = error.massage;
          rej(ret);
        });
    });
  };