const SunCalc = require("suncalc");
const path = require("path");
function moon(date) {
  const lat = 41.3111;
  const time = new Date(date);
  const lng = 69.2947;
  let moonPhase = SunCalc.getMoonIllumination(time, lat, lng).phase;
  moonPhase = Math.floor((moonPhase * 100) / 3.2);
  // console.log(moonPhase);
  let url = `https://t.me/moon_aziz/${33 - moonPhase}`;
  const link = path.join(__dirname, `../public/${32 - moonPhase}.jpg`);
  // if (moonPhase == 0) console.log(url, " ", link, " ", moonPhase);
  // if (moonPhase == 31) console.log(link, "url", url);
  return { url, link };
}

// for (let i = 1; i <= 2023; i++) {
// moon(`01-01-${2023 - i}`);
// }
module.exports = moon;
