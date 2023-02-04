const mergeImages = require("merge-images");
mergeImages([
  { src: "main.png", x: 0, y: 0 },
  { src: "also.png", x: 32, y: 0 },
]).then((bas64) => {});
