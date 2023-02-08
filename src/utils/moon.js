const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../users.json"), "utf8")
);
const getMoon = async (date) => {
  try {
    const url = `https://lunaf.com/lunar-calendar/${date}`;
    console.log(url);
    const rand = Math.floor(Math.random() * data.length);
    const response = await axios.get(url, {
      headers: {
        "User-Agent": data[rand],
      },
    });
    const $ = cheerio.load(response.data);

    const moon = $(".ezlazyload")
      .attr("data-ezsrcset")
      .split(",")[3]
      .split(" ")[0];
    console.log("https://lunaf.com" + moon);
    const text = "https://lunaf.com" + moon;
    return text;
  } catch (err) {
    console.log("error");
  }
};

module.exports = getMoon;
