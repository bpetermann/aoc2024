import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Game = {
  a: [x: number, y: number];
  b: [x: number, y: number];
  prize: [x: number, y: number];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const games: Game[] = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith("Button A:")) {
      const aSplit = input[i].split("+");
      const aX = +aSplit[1].split(",")[0];
      const aY = +aSplit[2];

      const bSplit = input[i + 1].split("+");
      const bX = +bSplit[1].split(",")[0];
      const bY = +bSplit[2];

      const prizeSplit = input[i + 2].split("=");
      const prizeX = +prizeSplit[1].split(",")[0];
      const prizeY = +prizeSplit[2];

      games.push({
        a: [aX, aY],
        b: [bX, bY],
        prize: [prizeX, prizeY],
      });

      i += 3;
    }
  }

  function possibleCombinations(
    [aX, aY]: [number, number],
    [bX, bY]: [number, number],
    [prizeX, prizeY]: [number, number],
  ) {
    const possibleSolutions: [number, number][] = [];

    outer: for (let i = 0; i <= 100; i++) {
      for (let j = 0; j <= 100; j++) {
        if (i * aX + j * bX === prizeX && i * aY + j * bY === prizeY)
          possibleSolutions.push([i, j]);
        else if (i * aX + j * bX > prizeX || i * aY + j * bY > prizeY)
          continue outer;
      }
    }

    return possibleSolutions;
  }

  function tokenAmount(combined: [number, number][]) {
    let tokens = (combined[0]?.[0] || 0) * 3 + (combined[0]?.[1] || 0) * 1;

    for (let i = 1; i < combined.length; i++) {
      const [a, b] = combined[i];
      const num = a * 3 + b * 1;
      if (num < tokens) tokens = num;
    }

    return tokens;
  }

  let tokens = 0;

  games.forEach(({ a, b, prize }) => {
    const combinations = possibleCombinations(a, b, prize);
    tokens += tokenAmount(combinations);
  });

  return tokens;
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
