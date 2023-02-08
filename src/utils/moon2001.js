const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const moonposition = async (year, month, day) => {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const link = `https://www.moonposition.com/moon-calendar/${year}/${
    months[month - 1]
  }/${day}`;
  const response = await axios.get(link);
  const $ = cheerio.load(response.data);
  const moon = $(".moon-img.img-responsive").attr("style").split("'")[1];
  return moon;
};

module.exports = moonposition;
