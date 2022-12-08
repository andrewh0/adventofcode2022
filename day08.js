const input = `30373
25512
65332
33549
35390`;

function parseInput() {
  return input
    .split("\n")
    .map((rowStr) => rowStr.split("").map((s) => parseInt(s)));
}

function makeEmptyMat(mat, fill = 0) {
  return new Array(mat.length)
    .fill(null)
    .map((_) => new Array(mat[0].length).fill(fill));
}

function fromBottom(mat) {
  const result = makeEmptyMat(mat);
  for (let c = 0; c < mat[0].length; c++) {
    let max = -Infinity;
    for (let r = mat.length - 1; r >= 0; r--) {
      const curr = mat[r][c];
      result[r][c] = curr > max ? 1 : 0;
      max = Math.max(max, curr);
    }
  }
  return result;
}

function fromTop(mat) {
  const result = makeEmptyMat(mat);
  for (let c = 0; c < mat[0].length; c++) {
    let max = -Infinity;
    for (let r = 0; r < mat.length; r++) {
      const curr = mat[r][c];
      result[r][c] = curr > max ? 1 : 0;
      max = Math.max(max, curr);
    }
  }
  return result;
}

function fromRight(mat) {
  const result = makeEmptyMat(mat);
  for (let r = 0; r < mat.length; r++) {
    let max = -Infinity;
    for (let c = mat[0].length - 1; c >= 0; c--) {
      const curr = mat[r][c];
      result[r][c] = curr > max ? 1 : 0;
      max = Math.max(max, curr);
    }
  }
  return result;
}

function fromLeft(mat) {
  const result = makeEmptyMat(mat);
  for (let r = 0; r < mat.length; r++) {
    let max = -Infinity;
    for (let c = 0; c < mat[0].length; c++) {
      const curr = mat[r][c];
      result[r][c] = curr > max ? 1 : 0;
      max = Math.max(max, curr);
    }
  }
  return result;
}

function combineVisibilities(visibilities) {
  const result = makeEmptyMat(visibilities[0]);
  for (let v of visibilities) {
    for (let r = 0; r < v.length; r++) {
      for (let c = 0; c < v[0].length; c++) {
        if (v[r][c] === 1) {
          result[r][c] = 1;
        }
      }
    }
  }
  return result;
}

function countTrees(mat) {
  let result = 0;
  for (let r = 0; r < mat.length; r++) {
    for (let c = 0; c < mat[0].length; c++) {
      if (mat[r][c] === 1) {
        result += 1;
      }
    }
  }
  return result;
}

function part1() {
  const mat = parseInput();
  const visibilities = [
    fromBottom(mat),
    fromTop(mat),
    fromLeft(mat),
    fromRight(mat),
  ];
  const combinedMat = combineVisibilities(visibilities);
  return countTrees(combinedMat);
}

// ---- Part 2

function lookRight(mat) {
  const result = makeEmptyMat(mat);
  for (let r = 0; r < mat.length; r++) {
    for (let c = 0; c < mat[0].length; c++) {
      let count = 0;
      let i = c + 1;
      const curr = mat[r][c];
      while (i < mat[0].length) {
        if (mat[r][i] >= curr) {
          count += 1;
          break;
        }
        count += 1;
        i++;
      }
      result[r][c] = count;
    }
  }
  return result;
}

function lookDown(mat) {
  const result = makeEmptyMat(mat);
  for (let c = 0; c < mat[0].length; c++) {
    for (let r = 0; r < mat.length; r++) {
      let count = 0;
      let i = r + 1;
      const curr = mat[r][c];
      while (i < mat.length) {
        if (mat[i][c] >= curr) {
          count += 1;
          break;
        }
        count += 1;
        i++;
      }
      result[r][c] = count;
    }
  }
  return result;
}

function lookUp(mat) {
  const result = makeEmptyMat(mat);
  for (let c = 0; c < mat[0].length; c++) {
    for (let r = mat.length - 1; r >= 0; r--) {
      let count = 0;
      let i = r - 1;
      const curr = mat[r][c];
      while (i >= 0) {
        if (mat[i][c] >= curr) {
          count += 1;
          break;
        }
        count += 1;
        i--;
      }
      result[r][c] = count;
    }
  }
  return result;
}

function lookLeft(mat) {
  const result = makeEmptyMat(mat);
  for (let r = 0; r < mat.length; r++) {
    for (let c = mat[0].length - 1; c >= 0; c--) {
      let count = 0;
      let i = c - 1;
      const curr = mat[r][c];
      while (i >= 0) {
        if (mat[r][i] >= curr) {
          count += 1;
          break;
        }
        count += 1;
        i--;
      }
      result[r][c] = count;
    }
  }
  return result;
}

function combineScores(scores) {
  const result = makeEmptyMat(scores[0], 1);
  for (let score of scores) {
    for (let r = 0; r < score.length; r++) {
      for (let c = 0; c < score[0].length; c++) {
        result[r][c] *= score[r][c];
      }
    }
  }
  return result;
}

function maxScore(mat) {
  let max = -Infinity;
  for (let r = 0; r < mat.length; r++) {
    for (let c = 0; c < mat[0].length; c++) {
      max = Math.max(max, mat[r][c]);
    }
  }
  return max;
}

function part2() {
  const mat = parseInput();
  const scores = [lookLeft(mat), lookRight(mat), lookUp(mat), lookDown(mat)];

  const combinedScore = combineScores(scores);
  return maxScore(combinedScore);
}
