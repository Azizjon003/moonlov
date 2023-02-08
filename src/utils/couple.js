function love(name, nameCouple) {
  const mainText = name + nameCouple;
  let text = mainText.toLowerCase();
  let letters = text.split("");
  let letterCount = letters.reduce(function (count, letter) {
    if (count[letter]) {
      count[letter]++;
    } else {
      count[letter] = 1;
    }
    return count;
  }, {});
  letterCount = Object.values(letterCount);
  let arr = [];
  letterCount.forEach((element) => {
    arr.push(element);
  });
  // console.log(arr);

  while (arr.length > 2) {
    if (arr.length % 2 == 0) {
      for (let i = 0, j = arr.length - 1; i < arr.length / 2; i++, j--) {
        arr[i] = arr[i] + arr[j];
        // console.log(arr);
        arr.pop();
      }
    } else {
      for (
        let i = 0, j = arr.length - 1;
        i < Math.floor(arr.length / 2);
        i++, j--
      ) {
        arr[i] = arr[i] + arr[j];
        // console.log(arr);
        arr.pop();
      }
    }
  }
  let result = `${arr[0]}${arr[1]}%`;
  return result;
}

module.exports = love;
