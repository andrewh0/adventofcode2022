const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

function isUnique(slice) {
  return new Set(slice.split("")).size === slice.length;
}

function part1() {
  for (let i = 0; i < input.length; i++) {
    const slice = input.slice(i, i + 4);
    if (isUnique(slice)) {
      return i + 4;
    }
  }
  return "none found!";
}

function part2() {
  for (let i = 0; i < input.length; i++) {
    const slice = input.slice(i, i + 14);
    if (isUnique(slice)) {
      return i + 14;
    }
  }
  return "none found!";
}
