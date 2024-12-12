import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => row.split(""));

const getFrequencies = (
  input: string[][],
  x: number,
  y: number,
  symbol: string,
) => {
  const locations: [number, number][] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (!(i === x && j === y) && input[i][j] === symbol) {
        locations.push([i, j]);
      }
    }
  }

  return locations;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const nodes = new Set<string>();

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] !== ".") {
        const frequencies = getFrequencies(input, i, j, input[i][j]);

        frequencies.forEach(([x, y]) => {
          let nextX = 2 * i - x;
          let nextY = 2 * j - y;

          if (
            nextX >= 0 &&
            nextX < input.length &&
            nextY >= 0 &&
            nextY < input[0].length
          ) {
            nodes.add(`${[nextX, nextY]}`);
          }
        });
      }
    }
  }

  return nodes.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const nodes = new Set<string>();

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] !== ".") {
        const frequencies = getFrequencies(input, i, j, input[i][j]);

        frequencies.forEach(([x, y]) => {
          let currentX = i;
          let currentY = j;

          let nextX = 2 * i - x;
          let nextY = 2 * j - y;

          nodes.add(`${x},${y}`);

          while (
            nextX >= 0 &&
            nextX < input.length &&
            nextY >= 0 &&
            nextY < input[0].length
          ) {
            nodes.add(`${nextX},${nextY}`);

            const prevX = currentX;
            const prevY = currentY;

            currentX = nextX;
            currentY = nextY;

            nextX = 2 * nextX - prevX;
            nextY = 2 * nextY - prevY;
          }
        });
      }
    }
  }

  return nodes.size;
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
