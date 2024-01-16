/**
 * modified https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
 * @returns
 */
export const generate = (tracks: any) => {
  var arr: any = [];
  while (arr.length < 3) {
    var r = Math.floor(Math.random() * tracks.length - 1) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};
