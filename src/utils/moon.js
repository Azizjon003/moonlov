const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const getMoon = async (date) => {
  const url = `https://lunaf.com/lunar-calendar/${date}`;
  console.log(url);
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  fs.writeFileSync("moon.html", response.data);
  const moon = $(".ezlazyload")
    .attr("data-ezsrcset")
    .split(",")[3]
    .split(" ")[0];
  console.log("https://lunaf.com" + moon);
  const text = "https://lunaf.com" + moon;
  return text;
};

module.exports = getMoon;
