const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

function parseInput() {
  const parseStrRange = (s) => s.split("-").map((s) => parseInt(s));
  const pairs = input
    .split("\n")
    .map((line) => line.split(","))
    .map((pairs) => {
      const [elfStr1, elfStr2] = pairs;
      return [parseStrRange(elfStr1), parseStrRange(elfStr2)];
    });

  return pairs;
}

function part1() {
  const pairList = parseInput();
  let result = 0;
  for (let [elfRange1, elfRange2] of pairList) {
    const [start1, end1] = elfRange1;
    const [start2, end2] = elfRange2;
    if (
      (start1 <= start2 && end1 >= end2) ||
      (start2 <= start1 && end2 >= end1)
    ) {
      result += 1;
    }
  }
  return result;
}

function part2() {
  const pairList = parseInput();
  let result = 0;
  for (let [elfRange1, elfRange2] of pairList) {
    const [start1, end1] = elfRange1;
    const [start2, end2] = elfRange2;
    if (
      (start1 <= start2 && end1 >= end2) ||
      (start2 <= start1 && end2 >= end1) ||
      (start2 <= end1 && end2 >= start1) ||
      (start1 <= end2 && end1 >= start2)
    ) {
      result += 1;
    }
  }
  return result;
}
