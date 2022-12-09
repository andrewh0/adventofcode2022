const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

function parseInput() {
  return input.split("\n").map((line) => {
    const [dir, amtStr] = line.split(" ");
    return [dir, parseInt(amtStr)];
  });
}

function pointToStr(point) {
  const [r, c] = point;
  return `${r},${c}`;
}

function moveUp(headPoint) {
  const [r, c] = headPoint;
  return [r - 1, c];
}

function moveDown(headPoint) {
  const [r, c] = headPoint;
  return [r + 1, c];
}

function moveLeft(headPoint) {
  const [r, c] = headPoint;
  return [r, c - 1];
}

function moveRight(headPoint) {
  const [r, c] = headPoint;
  return [r, c + 1];
}

function maybeMoveNextNode(currNodePoint, nextNodePoint) {
  const [r, c] = currNodePoint;
  const [r2, c2] = nextNodePoint;

  // Nine points centered on currNodePoint are touching currNodePoint. No need to move.
  const adjacentPoints = [
    [r - 1, c - 1],
    [r - 1, c],
    [r - 1, c + 1],
    [r, c - 1],
    [r, c],
    [r, c + 1],
    [r + 1, c - 1],
    [r + 1, c],
    [r + 1, c + 1],
  ];
  for (let p of adjacentPoints) {
    if (pointToStr(p) === pointToStr(nextNodePoint)) {
      return nextNodePoint;
    }
  }

  const nextNodeR = r2 < r ? r2 + 1 : r2 - 1;
  const nextNodeC = c2 < c ? c2 + 1 : c2 - 1;

  // Move row or column.
  if (r === r2) {
    return [r, nextNodeC];
  } else if (c === c2) {
    return [nextNodeR, c];
  } else {
    // Column and row both don't match. Move diagonally.
    return [nextNodeR, nextNodeC];
  }
}

function goThruSteps(directions, startPoint) {
  const tailVisits = new Set([pointToStr(startPoint)]);
  const [r, c] = startPoint;
  let currHeadPoint = [r, c];
  let currTailPoint = [r, c];

  for (let [dir, amt] of directions) {
    if (dir === "U") {
      for (let i = 0; i < amt; i++) {
        currHeadPoint = moveUp(currHeadPoint);
        currTailPoint = maybeMoveNextNode(currHeadPoint, currTailPoint);
        tailVisits.add(pointToStr(currTailPoint));
      }
    } else if (dir === "D") {
      for (let i = 0; i < amt; i++) {
        currHeadPoint = moveDown(currHeadPoint);
        currTailPoint = maybeMoveNextNode(currHeadPoint, currTailPoint);
        tailVisits.add(pointToStr(currTailPoint));
      }
    } else if (dir === "L") {
      for (let i = 0; i < amt; i++) {
        currHeadPoint = moveLeft(currHeadPoint);
        currTailPoint = maybeMoveNextNode(currHeadPoint, currTailPoint);
        tailVisits.add(pointToStr(currTailPoint));
      }
    } else {
      for (let i = 0; i < amt; i++) {
        currHeadPoint = moveRight(currHeadPoint);
        currTailPoint = maybeMoveNextNode(currHeadPoint, currTailPoint);
        tailVisits.add(pointToStr(currTailPoint));
      }
    }
  }

  return tailVisits.size;
}

function part1() {
  const directions = parseInput();
  return goThruSteps(directions, [0, 0]);
}

function moveRemaining(nodeList, onTailMove) {
  for (let n = 1; n < nodeList.length; n++) {
    nodeList[n] = maybeMoveNextNode(nodeList[n - 1], nodeList[n]);
  }
  onTailMove(pointToStr(nodeList[nodeList.length - 1]));
  return nodeList;
}

function simulate(directions, startPoint) {
  let nodeList = new Array(10).fill(null).map((_) => startPoint);

  const tailVisits = new Set([pointToStr(startPoint)]);

  for (let [dir, amt] of directions) {
    if (dir === "U") {
      for (let i = 0; i < amt; i++) {
        nodeList[0] = moveUp(nodeList[0]);
        nodeList = moveRemaining(nodeList, (tailPointStr) =>
          tailVisits.add(tailPointStr)
        );
      }
    } else if (dir === "D") {
      for (let i = 0; i < amt; i++) {
        nodeList[0] = moveDown(nodeList[0]);
        nodeList = moveRemaining(nodeList, (tailPointStr) =>
          tailVisits.add(tailPointStr)
        );
      }
    } else if (dir === "L") {
      for (let i = 0; i < amt; i++) {
        nodeList[0] = moveLeft(nodeList[0]);
        nodeList = moveRemaining(nodeList, (tailPointStr) =>
          tailVisits.add(tailPointStr)
        );
      }
    } else {
      for (let i = 0; i < amt; i++) {
        nodeList[0] = moveRight(nodeList[0]);
        nodeList = moveRemaining(nodeList, (tailPointStr) =>
          tailVisits.add(tailPointStr)
        );
      }
    }
  }

  return tailVisits.size;
}

function part2() {
  const directions = parseInput();
  return simulate(directions, [0, 0]);
}
