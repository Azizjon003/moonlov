const path = require("path");
const axios = require("axios");
const Jimp = require("jimp");

async function mergeImagesWithAxios(link1, link2) {
  const [image1Response, image2Response] = await Promise.all([
    axios.get(link1, {
      responseType: "arraybuffer",
    }),
    axios.get(link2, {
      responseType: "arraybuffer",
    }),
  ]);
  const [image1, image2] = await Promise.all([
    Jimp.read(image1Response.data),
    Jimp.read(image2Response.data),
  ]);
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
