import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((v) => v.split("\n"));

  let grid: string[][] = input[0].map((row) => row.split(""));
  const rows = grid.length;
  const cols = grid[0].length;

  let position: [number, number] = [0, 0];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "@") position = [i, j];
    }
  }

  const directions = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };

  const instructions = input[1].flatMap((v) => v.split(""));

  function isMoveAble([x1, y1]: number[], [x2, y2]: number[]) {
    const [newX, newY] = [x1 + x2, y1 + y2];

    if (grid[newX][newY] === "#") {
      return false;
    } else if (grid[newX][newY] === ".") {
      return true;
    } else {
      return isMoveAble([newX, newY], [x2, y2]);
    }
  }

  function moveBoxes([sx, sy]: number[], [dx, dy]: number[]) {
    const [newX, newY] = [sx + dx, sy + dy];

    if (grid[newX][newY] === ".") {
      grid[newX][newY] = "O";
      return;
    } else if (grid[newX][newY] === "#") {
      return;
    } else {
      moveBoxes([newX, newY], [dx, dy]);
    }
  }

  function movePlayer([newX, newY]: number[], [oldX, oldY]: number[]) {
    grid[oldX][oldY] = ".";
    grid[newX][newY] = "@";
  }

  function move([dx, dy]: number[]): [number, number] {
    const [oldX, oldY] = position;
    const [newX, newY] = [position[0] + dx, position[1] + dy];

    if (grid[newX][newY] === "#") {
      return [oldX, oldY];
    } else if (grid[newX][newY] === "O") {
      const canMove = isMoveAble([newX, newY], [dx, dy]);

      if (canMove) {
        movePlayer([newX, newY], [oldX, oldY]);
        moveBoxes([newX, newY], [dx, dy]);
        return [newX, newY];
      } else {
        return [oldX, oldY];
      }
    } else {
      movePlayer([newX, newY], [oldX, oldY]);
      return [newX, newY];
    }
  }

  while (instructions.length) {
    const instruction = instructions.shift();

    if (!instruction) break;

    switch (instruction) {
      case "^":
        position = move(directions.up);
        break;
      case ">":
        position = move(directions.right);
        break;
      case "<":
        position = move(directions.left);
        break;
      case "v":
        position = move(directions.down);
        break;
    }
  }

  let result = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "O") {
        result += 100 * i + j;
      }
    }
  }

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
