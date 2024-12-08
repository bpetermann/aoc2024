import run from "aocrunner";

enum Direction {
  North,
  East,
  South,
  West,
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => row.split(""));

const getStartPosition = (input: string[][]) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === "^") return [i, j];
    }
  }

  throw new Error("Starting position not found");
};

const newPostion = (direction: Direction, position: number[]): number[] => {
  const [x, y] = position;
  switch (direction) {
    case Direction.North:
      return [x - 1, y];
    case Direction.East:
      return [x, y + 1];
    case Direction.South:
      return [x + 1, y];
    case Direction.West:
      return [x, y - 1];
  }
};

const walk = (input: string[][]) => {
  const path = new Set<string>();
  let direction = Direction.North;
  let position = getStartPosition(input);

  while (true) {
    path.add(`${position}`);

    const [x, y] = newPostion(direction, position);

    if (x >= input.length || x < 0 || y >= input[0].length || y < 0) break;

    if (input[x][y] === "#") {
      direction = (direction + 1) % 4;
    } else {
      position = [x, y];
    }
  }

  return path;
};

const isLoop = (input: string[][], start: number[]) => {
  const path = new Set();
  let direction = Direction.North;
  let position = start;

  while (true) {
    const step = `${position[0]},${position[1]},${direction}`;

    if (path.has(step)) return true;

    path.add(step);

    const [x, y] = newPostion(direction, position);

    if (x >= input.length || x < 0 || y >= input[0].length || y < 0)
      return false;

    if (input[x][y] === "#") {
      direction = (direction + 1) % 4;
    } else {
      position = [x, y];
    }
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const path = walk(input);
  return path.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const path = walk(input);
  const steps = [...path].map((step) => step.split(",").map(Number));

  let start = getStartPosition(input);

  let count = 0;

  steps.forEach(([x, y]) => {
    input[x][y] = "#";

    if (isLoop(input, start)) count++;

    input[x][y] = ".";
  });

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
