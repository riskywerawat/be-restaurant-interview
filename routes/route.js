// const indexController = require('../controllers/indexController');
const restaurantController = require("../controllers/Controller");
const express = require("express");
const router = express.Router();
const { inputValidate, timeValidate } = require("../utilities/validator");

router.post(
  "/queryPlace",
  inputValidate(["textsearch"]),
  restaurantController.textSearch
);
router.post(
  "/placeDetail",
  inputValidate(["place_id"]),
  restaurantController.placeDetail
);

router.get(
  "/getPhotoRefernce",
  inputValidate(["photo_code", "maxwidth"]),
  restaurantController.placePhotoreFerence
);
module.exports = router;
