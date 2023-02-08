const sharp = require("sharp");
const path = require("path");
async function addText(params) {
  const width = 600;
  const height = 600;
  const label = params; // "Medium Text" "Short"
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${height} ${
    height + 2
  }">
    <!--this rect should have rounded corners-->
    <rect x="0" y="0" width="100%" height="100%" fill="#000"/>
    <text x="50%" y="50%" text-anchor="middle" font-size= "65px" font-family="San-serif" fill="#FF0000" margin="10px">${label}</text>
  </svg>
  `;

  //
  const svg_buffer = await Buffer.from(svg);
  const image = await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });
  const time = new Date().getTime();
  // const url = path.join(__dirname, `../public/1675686115724.jpg`);
  const url2 = path.join(__dirname, `../public/img/${time}.png`);
  await image
    .composite([
      {
        input: svg_buffer,
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toFile(url2);
  return url2;
}

module.exports = addText;
