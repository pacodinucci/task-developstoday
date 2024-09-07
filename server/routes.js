const express = require("express");
const { getAllAvailableCountries, getCountryInfo } = require("./controllers");

const router = express.Router();

router.get("/", getAllAvailableCountries);

router.get("/country", getCountryInfo);

module.exports = router;
