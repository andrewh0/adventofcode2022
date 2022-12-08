const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

function parseInput(input) {
  return input.split("\n").map((sack) => {
    const firstHalf = sack.slice(0, sack.length / 2);
    const secondHalf = sack.slice(sack.length / 2, sack.length);
    return [firstHalf, secondHalf];
  });
}

function compartmentIntersection(c1, c2) {
  const s1 = new Set(c1.split(""));
  const s2 = new Set(c2.split(""));
  for (let item of s1) {
    if (s2.has(item)) {
      return item;
    }
  }
}

function getPriority(item) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetList = alphabet.split("");
  const alphabetListUpper = alphabetList.map((s) => s.toUpperCase());
  const letters = [...alphabetList, ...alphabetListUpper];
  return letters.findIndex((s) => s === item) + 1;
}

function part1() {
  const sacks = parseInput(input);
  let sum = 0;
  for (let [compartment1, compartment2] of sacks) {
    const item = compartmentIntersection(compartment1, compartment2);
    sum += getPriority(item);
  }
  return sum;
}

function parseInput2(input) {
  const result = [];
  const lines = input.split("\n");
  let group = [];
  for (let i = 0; i < lines.length; i++) {
    if (i % 3 === 0 && group.length > 0) {
      result.push(group);
      group = [];
    }
    group.push(lines[i]);
  }
  if (group.length > 0) {
    result.push(group);
  }
  return result;
}

function getBadge(s1, s2, s3) {
  const set1 = new Set(s1.split(""));
  const set2 = new Set(s2.split(""));
  const set3 = new Set(s3.split(""));

  for (let item of set1) {
    if (set2.has(item) && set3.has(item)) {
      return item;
    }
  }
}

function part2() {
  const groups = parseInput2(input);
  let sum = 0;
  for (let [s1, s2, s3] of groups) {
    const item = getBadge(s1, s2, s3);
    sum += getPriority(item);
  }
  return sum;
}
