const { Scenes, Markup } = require("telegraf");
const enabled = require("../utils/enabled");
const db = require("../database/index");
const User = db.user;
const scene = new Scenes.BaseScene("start");

scene.enter(async (ctx) => {
  let text = "Salom sizga \n boshlash uchun Moon tugamasini bosing";
  console.log(ctx.update);
  const id = ctx.update.message.from.id;
  const shart = enabled(ctx, User);
  const keyboard = Markup.keyboard([["Moon"], ["Help Me"]])
    .resize()
    .oneTime();

  ctx.telegram.sendMessage(id, text, keyboard);
});

scene.hears("Moon", async (ctx) => {
  let text =
    "<i>Yaxshi tug'ulgan kuningizni kiriting</i> \n Misol uchun:<code>13-11-2003</code>";

  ctx.reply(text, {
    parse_mode: "HTML",
    reply_markup: {
      remove_keyboard: true,
    },
  });
  ctx.scene.enter("moon");
});
scene.hears("Help Me", async (ctx) => {
  let text = "Yordam uchun @coderjon_a";

  ctx.reply(text);
});

module.exports = scene;
