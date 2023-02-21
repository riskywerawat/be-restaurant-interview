
const _ = require("underscore");
const axios = require('axios');
const config = require('../config/config');
const restPromise = require("request-promise");

const dotenv = require('dotenv').config();
const model = require('../models/response').responseModel;
const {ConstantUtil} = require('../utilities/constantUtil');
const {ConstantRespCodeUtil} = require('../utilities/constantRespCodeUtil');
let {textSearch} = require('../services/service');
const respModel = _.clone(model);
respModel.namespace = ConstantUtil.PROJECT_NAME_SPACE;
respModel.respCode = ConstantRespCodeUtil.INTERNAL_SYSTEM_EXCEPTION_ENGINE_RESP_CODE[0]
respModel.respDesc = ConstantRespCodeUtil.INTERNAL_SYSTEM_EXCEPTION_ENGINE_RESP_CODE[1]

module.exports.textSearch = async (req, res) => {
    console.log(`################ request : ${req.body.textsearch} ################` );
    try {
        let resultApiPlace = await textSearch(req.body.textsearch);
        if(resultApiPlace && !_.isEmpty(resultApiPlace?.data)){
            respModel.data = resultApiPlace.data;
        }
        respModel.respCode = ConstantRespCodeUtil.SUCCESS_RESP_CODE[0];
        respModel.respDesc = ConstantRespCodeUtil.SUCCESS_RESP_CODE[1];
       res.send(respModel).status(200);
    }catch (err){
        console.log(`################ error exception ->>:: ${err} ################` );

        res.send(respModel).status(400);
    }   


  };
