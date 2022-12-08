const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

function parseInput() {
  return input.split("\n");
}

function getGroups() {
  const calorieList = parseInput();
  const groups = [];
  let sum = 0;
  for (let calorie of calorieList) {
    if (calorie === "") {
      groups.push(sum);
      sum = 0;
    } else {
      sum += parseInt(calorie);
    }
  }
  return groups;
}

function part1() {
  const groups = getGroups();
  return groups.reduce((acc, curr) => Math.max(acc, curr), 0);
}

function part2() {
  const groups = getGroups();
  groups.sort((a, b) => b - a);
  return groups.slice(0, 3).reduce((acc, curr) => acc + curr, 0);
}
