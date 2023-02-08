const path = require("path");
const Jimp = require("jimp");

async function mergeImagesWithAxios(link1, link2) {
  const image1 = await Jimp.read(link1);
  const image2 = await Jimp.read(link2);
  const height = image1.bitmap.height + image2.bitmap.height;
  const width = image2.bitmap.width;
  const image = new Jimp(width, height, 0x00000000);
  image.composite(image1, 0, 0);
  image.composite(image2, 0, image1.bitmap.height);
  const time = new Date().getTime();
  const url = path.join(__dirname, `../public/${time}.jpg`);
  image.write(url);

  return url;
}

module.exports = mergeImagesWithAxios;
