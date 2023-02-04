const { Scenes, Markup } = require("telegraf");

const scene = new Scenes.BaseScene("moon");

scene.hears(
  /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/,
  async (ctx) => {
    const text = "Juftingizni  tug'ulgan kuni " + ctx.message.text;

    ctx.reply(text);

    // ctx.scene.enter("couple");
  }
);

module.exports = scene;
