const { Scenes, Markup } = require("telegraf");
const db = require("../database/index");
const getMoon = require("../utils/moon");
const User = db.user;
const scene = new Scenes.BaseScene("couple");

scene.hears(
  /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/,
  async (ctx) => {
    const text =
      "Juftingizni  tug'ulgan kuni " +
      ctx.message.text +
      "\n.Cool tugmasini bosing va rasmlarni yuklab oling";
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
    const keyboard = Markup.keyboard([["Cool"]])
      .resize()
      .oneTime();

    ctx.reply(text, keyboard);
  }
);

scene.hears("Cool", async (ctx) => {
  const id = ctx.update.message.from.id;
  const user = await User.findOne({
    where: {
      telegramId: id,
    },
  });

  console.log(user);
  let birthday = `${user.birthday.split("-")[2]}/${
    user.birthday.split("-")[1]
  }/${user.birthday.split("-")[0]}`;
  let thisbirth = `${user.thisbirth.split("-")[2]}/${
    user.thisbirth.split("-")[1]
  }/${user.thisbirth.split("-")[0]}`;
  const birthdayLink = await getMoon(birthday);
  const thisbirthLink = await getMoon(thisbirth);

  ctx.telegram.sendPhoto(id, birthdayLink, {
    caption: "Sizning tug'ulgan kuningiz",
  });
  ctx.telegram.sendPhoto(id, thisbirthLink, {
    caption: "Juftingizning tug'ulgan kuni",
  });
});
scene.on("message", async (ctx) => {
  const text = "To'g'irlab kirita olmisanmi gapga tushin inson";
  ctx.reply(text);
});

module.exports = scene;
