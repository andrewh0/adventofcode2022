const input = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

function parseInput() {
  const [positions, moves] = input.split("\n\n");
  return [positions.split("\n"), moves.split("\n")];
}

function parsePositions(positionsStrs) {
  const result = [];
  const lastLine = positionsStrs[positionsStrs.length - 1];
  lastLine
    .trim()
    .split("   ")
    .map((s) => parseInt(s))
    .forEach((n) => {
      result[n] = [];
    });
  result[0] = [];

  for (let line of positionsStrs.slice(0, positionsStrs.length - 1)) {
    for (let i = 0; i < line.length; i++) {
      const column = (i - 1) / 4 + 1;
      if (!["[", "]", " "].includes(line[i])) {
        result[column].unshift(line[i]);
      }
    }
  }

  return result;
}

function parseMoves(movesList) {
  return movesList.map((s) => {
    const [_move, qty, _from, src, _to, dest] = s.split(" ");
    return [parseInt(qty), parseInt(src), parseInt(dest)];
  });
}

function makeMoves(positionsList, movesList) {
  const result = positionsList.slice();
  for (let [qty, src, dest] of movesList) {
    for (let i = 0; i < qty; i++) {
      const item = result[src].pop();
      result[dest].push(item);
    }
  }
  return result;
}

function makeMoves2(positionsList, movesList) {
  const result = positionsList.slice();
  for (let [qty, src, dest] of movesList) {
    const items = result[src].splice(result[src].length - qty, qty);
    result[dest] = result[dest].concat(items);
  }
  return result;
}

function part1() {
  const [positions, moves] = parseInput();
  const positionsList = parsePositions(positions);
  const movesList = parseMoves(moves);
  const result = makeMoves(positionsList, movesList).slice(1);
  return result.map((list) => list.slice(list.length - 1)[0]).join("");
}

function part2() {
  const [positions, moves] = parseInput();
  const positionsList = parsePositions(positions);
  const movesList = parseMoves(moves);
  const result = makeMoves2(positionsList, movesList).slice(1);
  return result.map((list) => list.slice(list.length - 1)[0]).join("");
}
