const input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

function parseInput() {
  const monkeys = input.split("\n\n").map((m) => m.trim().split("\n"));
  const result = [];
  for (let monkey of monkeys) {
    const [_monkeyIndex, itemsStr, opStr, testStr, trueStr, falseStr] = monkey;
    const startingItems = itemsStr
      .slice(16)
      .split(", ")
      .map((s) => parseInt(s));

    const [operand1Str, operator, operand2Str] = opStr
      .slice("Operation: new = ".length, opStr.length)
      .split(" ");
    const getOperand = (s) => (s === "old" ? s : parseInt(s));
    const operand1 = getOperand(operand1Str);
    const operand2 = getOperand(operand2Str);

    const test = parseInt(testStr.split(" ")[testStr.split(" ").length - 1]);
    const trueThrowTo = parseInt(
      trueStr.slice("  If true: throw to monkey ".length, trueStr.length)
    );
    const falseThrowTo = parseInt(
      falseStr.slice("  If false: throw to monkey ".length, falseStr.length)
    );

    result.push({
      startingItems,
      operation: { operand1, operator, operand2 },
      test,
      trueThrowTo,
      falseThrowTo,
    });
  }

  return result;
}

function getNewWorryLevel(oldLevel, operation) {
  const { operand1, operator, operand2 } = operation;

  const o1 = operand1 === "old" ? oldLevel : operand1;
  const o2 = operand2 === "old" ? oldLevel : operand2;

  switch (operator) {
    case "+":
      return o1 + o2;
    case "-":
      return o1 - o2;
    case "*":
      return o1 * o2;
    case "/":
      return o1 / o2;
    default:
      console.log("not supported", operator);
      return 0;
  }
}

function goThroughRound(monkeyState, onMonkeyInspect) {
  for (let i = 0; i < monkeyState.length; i++) {
    const { startingItems, operation, test, trueThrowTo, falseThrowTo } =
      monkeyState[i];

    while (startingItems.length > 0) {
      onMonkeyInspect(i);
      const oldWorryLevel = startingItems[0];
      const newWorryLevel = Math.floor(
        getNewWorryLevel(oldWorryLevel, operation) / 3
      );
      if (newWorryLevel % test === 0) {
        monkeyState[trueThrowTo].startingItems.push(newWorryLevel);
      } else {
        monkeyState[falseThrowTo].startingItems.push(newWorryLevel);
      }
      startingItems.shift();
    }
  }
}

function part1() {
  let monkeyState = parseInput();

  const monkeyInspections = new Array(monkeyState.length).fill(0);

  for (let i = 0; i < 20; i++) {
    goThroughRound(monkeyState, (i) => {
      monkeyInspections[i] += 1;
    });
  }

  const sortedMonkeyInspections = monkeyInspections
    .slice()
    .sort((a, b) => b - a);

  return sortedMonkeyInspections[0] * sortedMonkeyInspections[1];
}

function getModulo(monkeyState) {
  const divisors = monkeyState.map((m) => m.test);
  return divisors.reduce((acc, curr) => acc * curr, 1);
}

function goThroughRound2(monkeyState, modulo, onMonkeyInspect) {
  for (let i = 0; i < monkeyState.length; i++) {
    const { startingItems, operation, test, trueThrowTo, falseThrowTo } =
      monkeyState[i];

    while (startingItems.length > 0) {
      onMonkeyInspect(i);
      const oldWorryLevel = startingItems[0];
      const newWorryLevel = getNewWorryLevel(oldWorryLevel, operation) % modulo;
      if (newWorryLevel % test === 0) {
        monkeyState[trueThrowTo].startingItems.push(newWorryLevel);
      } else {
        monkeyState[falseThrowTo].startingItems.push(newWorryLevel);
      }
      startingItems.shift();
    }
  }
}

function part2() {
  let monkeyState = parseInput();

  const monkeyInspections = new Array(monkeyState.length).fill(0);
  const modulo = getModulo(monkeyState);

  for (let i = 0; i < 10000; i++) {
    goThroughRound2(monkeyState, modulo, (i) => {
      monkeyInspections[i] += 1;
    });
  }

  const sortedMonkeyInspections = monkeyInspections
    .slice()
    .sort((a, b) => b - a);

  return sortedMonkeyInspections[0] * sortedMonkeyInspections[1];
}
