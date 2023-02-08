const { Scenes, Markup } = require("telegraf");
const db = require("../database/index");
const addText = require("../utils/canvas");
const love = require("../utils/couple");
const fs = require("fs");
const User = db.user;
const scene = new Scenes.BaseScene("lovecouple");
scene.hears("Cool", async (ctx) => {
  const id = ctx.update.message.from.id;
  ctx.reply("Tayyorlanmoqda");
  const user = await User.findOne({
    where: {
      telegramId: id,
    },
  });

  console.log(user);
  let txt = user.birthday;

  let thisbirthLink = user.thisbirth;
  const foiz = love(txt, thisbirthLink);
  const text = `<i>Test bo'yicha natija ${foiz}</i>`;
  const url = await addText(foiz);
  const data = fs.readFileSync(url);
  await ctx.telegram.sendPhoto(
    id,
    {
      source: data,
      filename: "image.jpg",
    },
    {
      caption: text,
      parse_mode: "HTML",
    }
  );

  ctx.scene.enter("start");
});
scene.hears(/^[a-zA-Z]+$/, async (ctx) => {
  const text =
    "<i>Juftingizni  Ismi </i>" +
    ctx.message.text +
    "\n<i>Cool tugmasini bosing</i>";
  const id = ctx.update.message.from.id;

  User.update(
    {
      thisbirth: ctx.message.text,
    },
    {
      where: {
        telegramId: id,
      },
    }
  );

  ctx.reply(text, {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [["Cool"]],
      resize_keyboard: true,
    },
  });
});

scene.hears("/start", async (ctx) => {
  ctx.scene.enter("start");
});
scene.on("message", async (ctx) => {
  ctx.reply("Necha marta aytay senga ismingda son nima qiladi Odam");
});

module.exports = scene;
