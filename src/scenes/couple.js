const { Scenes, Markup } = require("telegraf");

const scene = new Scenes.BaseScene("couple");

scene.hears(
  /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/,
  async (ctx) => {
    const text =
      "Sizning tug'ulgan kuningiz " +
      ctx.message.text +
      "\n Juftingini tug'ilgan kunini kiriting \n Masalan: 01-01-2021";

    ctx.reply(text);

    ctx.scene.enter("couple");
  }
);

module.exports = scene;
