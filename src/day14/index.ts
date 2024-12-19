import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((m) => m.match(/-?\d+/g)?.map(Number)) as number[][];

function endPositions(
  [startX, startY, x, y]: number[],
  count: number,
  width: number,
  height: number,
) {
  let endX = (startX + count * x) % width;
  let endY = (startY + count * y) % height;

  if (endY < 0) endY += height;
  if (endX < 0) endX += width;

  return [endX, endY];
}

const width = 101;
const height = 103;

const halfWidth = Math.floor(width / 2);
const halfHeight = Math.floor(height / 2);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const finalPositions = input.map((value) =>
    endPositions(value, 100, width, height),
  );

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

  let count = 0;

  function isTree(array: number[][]) {
    let isTree = false;

    array.forEach(([x1, y1], _i, self) => {
      if (
        self.find(([x2, y2]) => x2 === x1 - 1 && y1 + 1 === y2) &&
        self.find(([x2, y2]) => x2 === x1 + 1 && y1 + 1 === y2) &&
        self.find(([x2, y2]) => x2 === x1 - 2 && y1 + 2 === y2) &&
        self.find(([x2, y2]) => x2 === x1 + 2 && y1 + 2 === y2) &&
        self.find(([x2, y2]) => x2 === x1 - 3 && y1 + 3 === y2) &&
        self.find(([x2, y2]) => x2 === x1 + 3 && y1 + 3 === y2)
      ) {
        isTree = true;
      }
    });

    return isTree;
  }

  while (true) {
    const finalPositions = input.map((value) =>
      endPositions(value, count, width, height),
    );

    if (isTree(finalPositions)) break;

    count++;
  }

  return count;
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
