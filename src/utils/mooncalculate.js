const SunCalc = require("suncalc");
const path = require("path");
function moon(date) {
  const lat = 41.3111;
  const time = new Date(date);
  const lng = 69.2947;
  let moonPhase = SunCalc.getMoonIllumination(time, lat, lng).phase;
  moonPhase = Math.floor((moonPhase * 100) / 3.2);
  let url = `https://t.me/moon_aziz/${33 - moonPhase}`;
  const link = path.join(__dirname, `../public/${33 - moonPhase}.jpg`);
  return { url, link };
}
module.exports = moon;
