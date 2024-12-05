import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(""));

const XMAS = "XMAS";

const MAS = "MAS";

enum Direction {
  Up,
  Down,
  UpLeft,
  UpRight,
  DownLeft,
  DownRight,
}

const isXmas = (value: string) => value === XMAS;

const directionString = (
  x: number,
  y: number,
  input: string[][],
  direction: Direction,
): string =>
  Array(4)
    .fill(undefined)
    .map((_, i) => {
      switch (direction) {
        case Direction.Up:
          return input[x - i][y];
        case Direction.Down:
          return input[x + i][y];
        case Direction.UpLeft:
          return input[x - i][y - i];
        case Direction.UpRight:
          return input[x - i][y + i];
        case Direction.DownLeft:
          return input[x + i][y - i];
        case Direction.DownRight:
          return input[x + i][y + i];
      }
    })
    .join("");

const horizontalArray = (index: number, input: string[]) =>
  input
    .slice(index - 3, index + 1)
    .reverse()
    .join("");

const checkHorizontal = (index: number, input: string[]) =>
  [
    ...(index >= 3 ? [horizontalArray(index, input)] : []),
    ...(index + 3 <= input.length
      ? [input.slice(index, index + 4).join("")]
      : []),
  ].filter(isXmas).length;

const checkVertical = (x: number, y: number, input: string[][]) =>
  [
    ...(x >= 3 ? [directionString(x, y, input, Direction.Up)] : []),
    ...(x + 3 < input.length
      ? [directionString(x, y, input, Direction.Down)]
      : []),
  ].filter(isXmas).length;

const checkDiagonal = (x: number, y: number, input: string[][]) =>
  [
    ...(x >= 3 && y >= 3
      ? [directionString(x, y, input, Direction.UpLeft)]
      : []),
    ...(x >= 3 && y + 3 <= input[x].length
      ? [directionString(x, y, input, Direction.UpRight)]
      : []),
    ...(x + 3 < input.length && y >= 3
      ? [directionString(x, y, input, Direction.DownLeft)]
      : []),
    ...(x + 3 < input.length && y + 3 < input[x].length
      ? [directionString(x, y, input, Direction.DownRight)]
      : []),
  ].filter(isXmas).length;

const isWithinBorders = (x: number, y: number, input: string[][]) =>
  x >= 1 && x + 1 < input.length && y >= 1 && y + 1 < input[x].length;

const directionArray = (x: number, y: number, input: string[][]) => [
  [input[x - 1][y - 1], input[x][y], input[x + 1][y + 1]].join(""),
  [input[x + 1][y - 1], input[x][y], input[x - 1][y + 1]].join(""),
  [input[x + 1][y + 1], input[x][y], input[x - 1][y - 1]].join(""),
  [input[x - 1][y + 1], input[x][y], input[x + 1][y - 1]].join(""),
];

const checkXmas = (x: number, y: number, input: string[][]) =>
  isWithinBorders(x, y, input) &&
  directionArray(x, y, input).filter((value) => value === MAS).length === 2
    ? 1
    : 0;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;

  input.forEach((line, index) =>
    line.forEach((value, i, self) => {
      if (value === "X") {
        result += checkHorizontal(i, self);
        result += checkVertical(index, i, input);
        result += checkDiagonal(index, i, input);
      }
    }),
  );

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;

  input.forEach((line, index) =>
    line.forEach((value, i) => {
      if (value === "A") result += checkXmas(index, i, input);
    }),
  );

  return result;
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
