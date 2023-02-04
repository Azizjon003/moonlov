require("dotenv").config();
const { bot } = require("./core/bot");
const session = require("./core/session");

const stage = require("./scenes/index");
const botStart = require("./utils/startbot");
require("./database");
bot.use(session);
bot.use((ctx, next) => {
  ctx.session ?? (ctx.session = {});
  next();
});
bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter("start"));

botStart(bot);
