const { Scenes, Markup } = require("telegraf");
const db = require("../database/index");
const User = db.user;
const scene = new Scenes.BaseScene("love");

scene.hears("Love", async (ctx) => {
  const id = ctx.update.message.from.id;
  ctx.reply("Ismingizni kiriting", {});
});
scene.hears(/^[a-zA-Z]+$/, async (ctx) => {
  const id = ctx.update.message.from.id;

  User.update(
    {
      birthday: ctx.message.text,
    },
    {
      where: {
        telegramId: id,
      },
    }
  );

  const text =
    "Sizning ismingiz " +
    ctx.message.text +
    "❤️\n❤️ <i>Juftingini ismini kiriting </i>\n Masalan: <code>John</code>";
  ctx.reply(text, {
    parse_mode: "HTML",
  });
  ctx.scene.enter("lovecouple");
});
scene.hears("/start", async (ctx) => {
  ctx.scene.enter("start");
});
scene.on("message", async (ctx) => {
  ctx.reply("Necha marta aytay senga ismingda son nima qiladi Odam");
});

module.exports = scene;
