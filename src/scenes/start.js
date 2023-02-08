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
  if (id !== 1953925296) {
    const keyboard = Markup.keyboard([["Moon"], ["Help Me", "Statistics"]])
      .resize()
      .oneTime();

    ctx.telegram.sendMessage(id, text, keyboard);
  } else {
    const keyboard = Markup.keyboard([
      ["Moon", "Xabar yubor Azizjon"],
      ["Help Me", "Statistics"],
    ])
      .resize()
      .oneTime();

    ctx.telegram.sendMessage(id, text, keyboard);
  }
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
scene.hears("Statistics", async (ctx) => {
  const id = ctx.update.message.from.id;

  const user = await User.count();
  const userToday = await User.count({
    where: {
      createdAt: {
        [db.Op.gte]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    },
  });

  let textMessage = `Foydalanuvchilar soni user: ${user}.\nBugun qo'shilganlar ro'yhati: ${userToday}\n`;
  ctx.telegram.sendMessage(id, textMessage);
});
scene.hears("Xabar yubor Azizjon", async (ctx) => {
  ctx.reply("Xabar yuborish uchun yozing");
  ctx.scene.enter("sendmessage");
});

module.exports = scene;
