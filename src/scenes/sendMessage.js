const { Scenes, Markup } = require("telegraf");
const db = require("../database/index");
const User = db.user;
const scene = new Scenes.BaseScene("sendmessage");

scene.on("message", async (ctx) => {
  const id = ctx.update.message.from.id;
  const text = ctx.update.message.text.trim();
  const users = await User.findAll();
  console.log(users);

  for (let i = 0; i < users.length; i++) {
    try {
      await ctx.telegram.sendMessage(users[i].telegramId, text, {
        parse_mode: "HTML",
      });
    } catch (error) {
      console.log(error);
      ctx.telegram.sendMessage(id, `Xatolik yuz berdi ${error.message}`);
    }
  }

  ctx.telegram.sendMessage(
    id,
    "Buyruqlar bajarildi menga Ruxsat Admin  😎.Siz bosh menyudasiz"
  );
  ctx.scene.enter("start");
});

module.exports = scene;
