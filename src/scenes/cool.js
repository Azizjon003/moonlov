const { Scenes, Markup } = require("telegraf");
const db = require("../database/index");
const User = db.user;
const scene = new Scenes.BaseScene("couple");

scene.on("message", async (ctx) => {
  const text = "To'g'irlab kirita olmisanmi gapga tushin inson";
  ctx.reply(text);
});

module.exports = scene;
