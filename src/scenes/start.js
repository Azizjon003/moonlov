const { Scenes, Markup } = require("telegraf");
const enabled = require("../utils/enabled");
const db = require("../database/index");
const User = db.user;
const scene = new Scenes.BaseScene("start");

scene.enter(async (ctx) => {
  let text = "Salom Foydalanuvchi \n boshlash uchun Moon tugamasini bosing";
  console.log(ctx.update);
  const id = ctx.update.message.from.id;
  const shart = enabled(ctx, User);
  const keyboard = Markup.keyboard([["Moon"], ["Help Me", "About Us"]])
    .resize()
    .oneTime();

  ctx.telegram.sendMessage(id, text, keyboard);
});

scene.hears("Moon", async (ctx) => {
  let text = "Yaxshi tug'ulgan kuningizni kiriting \n Misol uchun: 13-11-2003";

  ctx.reply(text);
  ctx.scene.enter("moon");
});

module.exports = scene;
