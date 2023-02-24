
const _ = require("underscore");
const axios = require('axios');
const config = require('../config/config');
const restPromise = require("request-promise");

const dotenv = require('dotenv').config();
const model = require('../models/response').responseModel;
const {ConstantUtil} = require('../utilities/constantUtil');
const {ConstantRespCodeUtil} = require('../utilities/constantRespCodeUtil');
let {textSearch, placePhotoreFerence, placeDetail} = require('../services/placeService');
let redisService = require('../services/redisService');
const respModel = _.clone(model);
respModel.namespace = ConstantUtil.PROJECT_NAME_SPACE;
respModel.respCode = ConstantRespCodeUtil.INTERNAL_SYSTEM_EXCEPTION_ENGINE_RESP_CODE[0]
respModel.respDesc = ConstantRespCodeUtil.INTERNAL_SYSTEM_EXCEPTION_ENGINE_RESP_CODE[1]
/**
 * textSearch apis
 */
module.exports.textSearch = async (req, res) => {
    console.log(`################ request : ${JSON.stringify(req.body)} ################` );
    try {
         //! เช็ค redis ด้วย textSearch จาก custumer     
        let getRedisData = await redisService.getRedis(req.body.textsearch);
        console.log(`################ getRedisData result : ${JSON.stringify(getRedisData)} ################` );
        console.log(`################ getRedisData found : ${JSON.stringify(getRedisData?.data)} ################` );
    
            if(getRedisData && !_.isEmpty(getRedisData.data)){
                console.log(`################ found redis ^ ################` );
                respModel.data = getRedisData.data;
            }else{
                console.log(`################ not found redis ^ ################` );
                let resultApiPlace = await textSearch(req.body.textsearch);
            
                if(resultApiPlace && !_.isEmpty(resultApiPlace?.data)){
                     //! get redis ด้วย textSearch จาก custumer  
                    let resultSetRedis = await redisService.setDataWithExpireTimeBySecond(req.body.textsearch,resultApiPlace.data,config.EXIPRED_REDIS)
                    console.log(`################ redis has been set ^ ################` );
                    console.log(`################ getRedisData found : ${JSON.stringify(resultSetRedis)} ################` );

                    respModel.data = resultApiPlace.data;
                }
            }
    
        respModel.respCode = ConstantRespCodeUtil.SUCCESS_RESP_CODE[0];
        respModel.respDesc = ConstantRespCodeUtil.SUCCESS_RESP_CODE[1];
       res.send(respModel).status(200);
    }catch (err){
        console.log(`################ error exception ->>:: ${err} ################` );

        res.send(respModel).status(400);
    }   


  };
  module.exports.placePhotoreFerence = async (req, res) => {
    console.log(`################ request : ${JSON.stringify(req.body)} ################` );
    try {
         //! เช็ค redis ด้วย photo_code
        let getRedisplacePhoto = await redisService.getRedis(req.body.photo_code);
            if(getRedisplacePhoto && !_.isEmpty(getRedisplacePhoto.data)){
                console.log(`################ found redis  placePhotoreFerence photo_code ^ ################` );
                respModel.data = getRedisData.data;
            }else{
                //! set redis ด้วย photo_code      
                let resultApiPlacePhoto = await placePhotoreFerence(req.body.photo_code,req.body.maxwidth);
                if(resultApiPlacePhoto && !_.isEmpty(resultApiPlacePhoto?.data)){
                    let resultSetRedis = await redisService.setDataWithExpireTimeBySecond(req.body.photo_code,resultApiPlacePhoto.data,config.EXIPRED_REDIS)
                    console.log(`################ redis has been set ^ ################` );
                    console.log(`################ placePhotoreFerence found : ${JSON.stringify(resultSetRedis)} ################` );
                    respModel.data = resultApiPlacePhoto.data;
                }
            }
      
        respModel.respCode = ConstantRespCodeUtil.SUCCESS_RESP_CODE[0];
        respModel.respDesc = ConstantRespCodeUtil.SUCCESS_RESP_CODE[1];
       res.send(respModel).status(200);
    }catch (err){
        console.log(`################ error exception ->>:: ${err} ################` );

        res.send(respModel).status(400);
    }   


  };

  module.exports.placeDetail = async (req, res) => {
    console.log(`################ request : ${JSON.stringify(req.body)} ################` );
    try {
        //! เช็ค redis ด้วย placeDetail
        let getRedisplaceplaceDetail = await redisService.getRedis(req.body.place_id);
            if(getRedisplaceplaceDetail && !_.isEmpty(getRedisplaceplaceDetail.data)){
                console.log(`################ found redis  placePhotoreFerence place_id ^ ################` );
                console.log(getRedisplaceplaceDetail)
                respModel.data = getRedisplaceplaceDetail.data;
            }else{
                let resultApiPlaceDetail = await placeDetail(req.body.place_id);
                if(resultApiPlaceDetail && !_.isEmpty(resultApiPlaceDetail?.data)){
        //! set redis ด้วย placeDetail 
                    let resultSetRedis = await redisService.setDataWithExpireTimeBySecond(req.body.place_id,resultApiPlaceDetail.data.result,config.EXIPRED_REDIS)
                    console.log(`################ redis has been set ^ ################` );
                    console.log(`################ placeDetail found : ${JSON.stringify(resultSetRedis)} ################` );
                    respModel.data = resultApiPlaceDetail.data.result;
                }
            }
      
        respModel.respCode = ConstantRespCodeUtil.SUCCESS_RESP_CODE[0];
        respModel.respDesc = ConstantRespCodeUtil.SUCCESS_RESP_CODE[1];
       res.send(respModel).status(200);
    }catch (err){
        console.log(`################ error exception ->>:: ${err} ################` );

        res.send(respModel).status(400);
    }   


  };
