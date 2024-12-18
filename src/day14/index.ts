import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((m) => m.match(/-?\d+/g)?.map(Number)) as number[][];

  const width = 101;
  const height = 103;

  const halfWidth = Math.floor(width / 2);
  const halfHeight = Math.floor(height / 2);

  function calculateEndPosition([startX, startY, x, y]: number[]) {
    let endX = (startX + 100 * x) % width;
    let endY = (startY + 100 * y) % height;

    if (endY < 0) endY += height;
    if (endX < 0) endX += width;

    return [endX, endY];
  }

  const finalPositions = input.map((value) => calculateEndPosition(value));

  let final: string[][] = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const robots = finalPositions.filter(
        ([x, y]) => x === j && y === i,
      ).length;
      row.push(robots ? robots.toString() : ".");
    }
    final.push(row);
  }

  const quadrants = [0, 0, 0, 0];

  for (let i = 0; i < final.length; i++) {
    inner: for (let j = 0; j < final[i].length; j++) {
      if (isNaN(+final[i][j])) continue inner;

      if (i < halfHeight && j < halfWidth) {
        quadrants[0] += +final[i][j];
      } else if (i < halfHeight && j > halfWidth) {
        quadrants[1] += +final[i][j];
      } else if (i > halfHeight && j < halfWidth) {
        quadrants[2] += +final[i][j];
      } else if (i > halfHeight && j > halfWidth) {
        quadrants[3] += +final[i][j];
      }
    }
  }

  const result = quadrants.reduce((prev, current) => prev * current, 1);

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
