const { Scenes, Markup } = require("telegraf");
const db = require("../database/index");
const getMoon = require("../utils/moon");
const User = db.user;
const fs = require("fs");
const mergeImagesWithAxios = require("../utils/joinimag");
const { default: axios } = require("axios");
const scene = new Scenes.BaseScene("couple");

scene.hears(
  /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/,
  async (ctx) => {
    const text =
      "<i>Juftingizni  tug'ulgan kuni </i>" +
      ctx.message.text +
      "\n<i>Cool tugmasini bosing va rasmlarni yuklab oling</i>";
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
  }
);

scene.hears("Cool", async (ctx) => {
  const id = ctx.update.message.from.id;
  ctx.reply("Yuklab olinmoqda...");
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

  await ctx.telegram.sendPhoto(id, birthdayLink, {
    caption: "<i>Sizning tug'ulgan kuningiz</i>",
    parse_mode: "HTML",
  });
  await ctx.telegram.sendPhoto(id, thisbirthLink, {
    caption: "<i>Juftingizning tug'ulgan kuni</i>",
    parse_mode: "HTML",
  });

  const url = await mergeImagesWithAxios(birthdayLink, thisbirthLink);
  await axios.get("http://magicsoft.uz/");
  const data = fs.readFileSync(url);
  await ctx.telegram.sendPhoto(
    id,
    {
      source: data,
      filename: "image.jpg",
    },
    {
      caption: "Sizning va juftingizning tug'ulgan kunlari",
    }
  );

  ctx.scene.enter("start");
});
scene.on("message", async (ctx) => {
  const text = "To'g'irlab kirita olmisanmi gapga tushin inson";
  ctx.reply(text);
});

module.exports = scene;
