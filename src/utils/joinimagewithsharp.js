// // const im = require("imagemagick");
// // const { promisify } = require("util");
// // const path = require("path");
// // const convertAsync = promisify(im.convert);
// // async function combineImagesVertically(image1Path, image2Path) {
// //   const time = new Date().getTime();
// //   const url = path.join(__dirname, `../public/${time}.jpg`);
// //   await convertAsync([image1Path, image2Path, "-append", url]);

// //   console.log("succesfull");
// //   return url;
// // }

// // module.exports = combineImagesVertically;

// const sharp = require("sharp");
// const path = require("path");

// const compositeImage = async (link, link1) => {
//   const image1Buffer = sharp(link);
//   const time = new Date().getTime();
//   const url = path.join(__dirname, `../public/${time}.jpg`);
//   await image1Buffer
//     .composite([
//       {
//         input: link1,
//         top: 500,
//         left: 0,
//         gravity: "centre",
//         raw: {
//           width: 800,
//           height: 800,
//           channels: 2,
//         },
//       },
//     ])
//     .toFile(url);
//   return url;
// };
// module.exports = compositeImage;

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function mergeImagesWithSharp(link1, link2) {
  const buffer1 = sharp(link1);
  const buffer2 = sharp(link2);

  const metadata = await buffer1.metadata();
  const metadata2 = await buffer2.metadata();

  const height = metadata2.height + metadata.height;
  const width = metadata2.width;
  const image = sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 0, g: 0, b: 0 },
    },
  });
  const time = new Date().getTime();
  // const url = path.join(__dirname, `../public/1675686115724.jpg`);
  const url2 = path.join(__dirname, `../public/img/${time}.png`);
  // await image.toFile(url);
  await sleep(500);

  await image.composite([
    { input: link1, top: 0, left: 0, channels: 2 },
    {
      input: link2,
      top: metadata.height,
      left: 0,
      channels: 2,
    },
  ]);
  image.toFile(url2);
  return url2;
}

module.exports = mergeImagesWithSharp;
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
