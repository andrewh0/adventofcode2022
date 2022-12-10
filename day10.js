const input = `noop
addx 3
addx -5`;

function parseInput() {
  return input.split("\n").map((line) => {
    const [result, num] = line.split(" ");
    return num ? [result, parseInt(num)] : [result];
  });
}

function runCycles(instructions, onCalculateSignal) {
  let x = 1;
  let t = 1;
  let i = 0;

  let ticksForAdd = 1;
  let carryOverX = 0;

  while (true) {
    let [instruction, amt] = instructions[i];
    if (carryOverX) {
      x += carryOverX;
      carryOverX = 0;
    }
    if (instruction === "noop") {
      i += 1;
    } else {
      if (ticksForAdd === 0) {
        carryOverX = amt;
        i += 1;
        ticksForAdd = 1;
      } else {
        ticksForAdd -= 1;
      }
    }
    if ([20, 60, 100, 140, 180, 220].includes(t)) {
      onCalculateSignal(t * x);
    }

    if (i >= instructions.length) {
      break;
    }

    t += 1;
  }

  t += 1;
  if (carryOverX) {
    x += carryOverX;
    carryOverX = 0;
  }
}

function part1() {
  const instructions = parseInput();

  let signalSum = 0;
  runCycles(instructions, (s) => {
    const result = (signalSum += s);
    return result;
  });
  return signalSum;
}

function makeBoard(r, c) {
  return new Array(r).fill(null).map((_) => {
    return new Array(c).fill(null).map((_) => ".");
  });
}

function printScreen(board) {
  board.forEach((r) => {
    console.log(r.join(""));
  });
}

function getSpritePositions(x) {
  return [x - 1, x, x + 1].filter((i) => i >= 0 && i < 40);
}

function maybeGetPixelCoordinate(t, x) {
  const spritePositions = getSpritePositions(x);
  const row = Math.floor((t - 1) / 40);
  const col = (t - 1) % 40;

  if (spritePositions.includes(col)) {
    return [row, col];
  }
  return null;
}

function runCycles2(instructions, onPixelDraw) {
  let x = 1;
  let t = 1;
  let i = 0;

  let ticksForAdd = 1;
  let carryOverX = 0;

  while (true) {
    let [instruction, amt] = instructions[i];
    if (carryOverX) {
      x += carryOverX;
      carryOverX = 0;
    }
    if (instruction === "noop") {
      i += 1;
    } else {
      if (ticksForAdd === 0) {
        carryOverX = amt;
        i += 1;
        ticksForAdd = 1;
      } else {
        ticksForAdd -= 1;
      }
    }
    if (i >= instructions.length) {
      break;
    }
    onPixelDraw(maybeGetPixelCoordinate(t, x));
    t += 1;
  }

  t += 1;
  if (carryOverX) {
    x += carryOverX;
    carryOverX = 0;
  }
}

function part2() {
  const screen = makeBoard(6, 40);
  const instructions = parseInput();
  runCycles2(instructions, (coord) => {
    if (coord) {
      const [r, c] = coord;
      screen[r][c] = "#";
    }
  });

  printScreen(screen);
}
