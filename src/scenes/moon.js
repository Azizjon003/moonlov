const { Scenes, Markup } = require("telegraf");

const scene = new Scenes.BaseScene("moon");
const db = require("../database/index");
const User = db.user;
scene.hears(
  /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/,
  async (ctx) => {
    const text =
      "<i>Sizning tug'ulgan kuningiz </i>" +
      `<code>${ctx.message.text}</code>` +
      "❤️\n❤️ <i>Juftingini tug'ilgan kunini kiriting </i>\n Masalan: <code>01-01-2021</code>";
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
    ctx.reply(text, {
      parse_mode: "HTML",
    });

    ctx.scene.enter("couple");
  }
);
scene.on("message", async (ctx) => {
  const text = "To'g'irlab kirita olmisanmi gapga tushin inson";
  ctx.reply(text);
});

module.exports = scene;
