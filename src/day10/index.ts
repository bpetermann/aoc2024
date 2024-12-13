import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => row.split("").map(Number));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  type Position = [number, number];

  let startPositions: Position[] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 0) startPositions.push([i, j]);
    }
  }

  const findNext = ([x, y]: Position): Position[] => {
    const nextPos = input[x][y] + 1;

    let next: Position[] = [];

    if (input[x + 1]?.[y] === nextPos) next.push([x + 1, y]);
    if (input[x - 1]?.[y] === nextPos) next.push([x - 1, y]);
    if (input[x]?.[y + 1] === nextPos) next.push([x, y + 1]);
    if (input[x]?.[y - 1] === nextPos) next.push([x, y - 1]);

    return next;
  };

  let result = 0;

  startPositions.forEach((pos) => {
    let queue = [pos];

    while (queue.length) {
      const routes: Position[] = [];
      const duplicates: number[] = [];

      queue.forEach(([x, y]) => {
        if (input[x][y] == 9) result++;
        else routes.push(...findNext([x, y]));
      });

      routes.forEach(([x, y], i) => {
        [...routes.slice(i + 1)].forEach((pos, index) => {
          if (pos[0] === x && pos[1] === y) {
            duplicates.push(i + 1 + index);
          }
        });
      });

      queue = routes.filter((_, i) => !duplicates.includes(i));
    }
  });

  return result;
};

const part2 = (rawInput: string) => {};

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
