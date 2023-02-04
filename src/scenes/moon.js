const { Scenes, Markup } = require("telegraf");

const scene = new Scenes.BaseScene("moon");
const db = require("../database/index");
const User = db.user;
scene.hears(
  /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/,
  async (ctx) => {
    const text =
      "Sizning tug'ulgan kuningiz " +
      ctx.message.text +
      "\n Juftingini tug'ilgan kunini kiriting \n Masalan: 01-01-2021";
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
    ctx.reply(text);

    ctx.scene.enter("couple");
  }
);
scene.on("message", async (ctx) => {
  const text = "To'g'irlab kirita olmisanmi gapga tushin inson";
  ctx.reply(text);
});

module.exports = scene;
