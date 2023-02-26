// const indexController = require('../controllers/indexController');
const restaurantController = require("../controllers/Controller");
const express = require("express");
const router = express.Router();
const { inputValidate, timeValidate } = require("../utilities/validator");
/**
required textsearch
*/
router.post(
  "/queryPlace",
  inputValidate(["textsearch"]),
  restaurantController.textSearch
);
/**
required place_id
*/
router.post(
  "/placeDetail",
  inputValidate(["place_id"]),
  restaurantController.placeDetail
);
/**
required photo_code,maxwidth
*/
router.post(
  "/getPhotoRefernce",
  inputValidate(["photo_code", "maxwidth"]),
  restaurantController.placePhotoreFerence
);

router.get(
  "/getcontentProminence",
  restaurantController.getcontentProminence
);
module.exports = router;
