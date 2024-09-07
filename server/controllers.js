const axios = require("axios");
require("dotenv").config();

const { API_BASE_URL, API_BASE_URL2, API_BASE_URL3 } = process.env;

const getAllAvailableCountries = async (req, res) => {
  try {
    const countriesResponse = await axios(API_BASE_URL);
    const countries = countriesResponse.data;
    res.json(countries);
  } catch (error) {
    console.error("Error fetching all available countries", error);
    res.status(500).json({ message: "Error fetching all available countries" });
  }
};

const getCountryInfo = async (req, res) => {
  try {
    const { countryCode } = req.query;

    const countryBordersResponse = await axios(
      `${API_BASE_URL2}/${countryCode}`
    );
    const countryBorders = countryBordersResponse.data.borders;
    const countryName = countryBordersResponse.data.commonName;

    const countryPopulationResponse = await axios(
      `${API_BASE_URL3}/population`
    );
    const countryPopulation = countryPopulationResponse.data.data.find(
      (c) => c.country === countryName
    ).populationCounts;

    const countryFlagResponse = await axios(`${API_BASE_URL3}/flag/images`);
    const countryFlag = countryFlagResponse.data.data.find(
      (c) => c.name === countryName
    ).flag;
    res.json({
      name: countryName,
      borders: countryBorders,
      population: countryPopulation,
      flag: countryFlag,
    });
  } catch (error) {
    console.error("Error fetching country info", error);
    res.status(500).json({ message: "Error fetching country info." });
  }
};

module.exports = { getAllAvailableCountries, getCountryInfo };
