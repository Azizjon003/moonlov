const { Scenes } = require("telegraf");
console.log(Scenes);
const stage = new Scenes.Stage([
  require("./start"),
  require("./moon"),
  require("./couple"),
  require("./sendMessage"),
  require("./love"),
  require("./lovecouple"),
]);

module.exports = stage;
