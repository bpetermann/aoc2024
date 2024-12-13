import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => row.split("").map(Number));

type Position = [number, number];

const getStartPositions = (input: number[][]) => {
  let startPositions: Position[] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 0) startPositions.push([i, j]);
    }
  }

  return startPositions;
};

const findNext = ([x, y]: Position, input: number[][]): Position[] => {
  const nextPos = input[x][y] + 1;
  const next: Position[] = [];

  if (input[x + 1]?.[y] === nextPos) next.push([x + 1, y]);
  if (input[x - 1]?.[y] === nextPos) next.push([x - 1, y]);
  if (input[x]?.[y + 1] === nextPos) next.push([x, y + 1]);
  if (input[x]?.[y - 1] === nextPos) next.push([x, y - 1]);

  return next;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;

  getStartPositions(input).forEach((pos) => {
    let path = [pos];

    while (path.length) {
      const routes: Position[] = [];
      const duplicates: (number | null)[] = [];

      path.forEach(([x, y]) => {
        if (input[x][y] == 9) result++;
        else routes.push(...findNext([x, y], input));
      });

      routes.forEach(([x, y], i) => {
        duplicates.push(
          ...[...routes.slice(i + 1)].map(([a, b], index) =>
            a === x && b === y ? i + 1 + index : null,
          ),
        );
      });

      path = routes.filter((_, i) => !duplicates.includes(i));
    }
  });

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;

  getStartPositions(input).forEach((pos) => {
    let path = [pos];

    while (path.length) {
      const routes: Position[] = [];

      path.forEach(([x, y]) => {
        if (input[x][y] == 9) result++;
        else routes.push(...findNext([x, y], input));
      });

      path = routes.filter(Boolean);
    }
  });

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
