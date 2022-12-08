const input = `A Y
B X
C Z`;

const shapes = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcomes = {
  X: {
    // rock
    A: 3, // rock
    B: 0, // paper
    C: 6, // scissors
  },
  Y: {
    // paper
    A: 6, // rock
    B: 3, // paper
    C: 0, // scissors
  },
  Z: {
    // scissors
    A: 0, // rock
    B: 6, // paper
    C: 3, // scissors
  },
};

const moves = {
  A: {
    // rock
    X: "Z", // loss scissors
    Y: "X", // draw rock
    Z: "Y", // win paper
  },
  B: {
    // paper
    X: "X", // loss rock
    Y: "Y", // draw paper
    Z: "Z", // win scissors
  },
  C: {
    // scissors
    X: "Y", // loss paper
    Y: "Z", // draw scissors
    Z: "X", // win rock
  },
};

function parseInput(input) {
  return input.split("\n").map((r) => r.split(" "));
}

function getRoundScore(me, opponent) {
  return shapes[me] + outcomes[me][opponent];
}

function part1() {
  const rounds = parseInput(input);
  return rounds.reduce((acc, [opponent, me]) => {
    return acc + getRoundScore(me, opponent);
  }, 0);
}

function getMyMove(opponent, outcome) {
  return moves[opponent][outcome];
}

function part2() {
  const rounds = parseInput(input);
  return rounds.reduce((acc, [opponent, outcome]) => {
    const myMove = getMyMove(opponent, outcome);
    return acc + getRoundScore(myMove, opponent);
  }, 0);
}

console.log(part2());
