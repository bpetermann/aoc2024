import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((m) => m.match(/\d+/g)?.map(Number)) as number[][];

  function possibleCombinations([aX, aY, bX, bY, prizeX, prizeY]: number[]) {
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

  input.forEach((game) => {
    const combinations = possibleCombinations(game);
    tokens += tokenAmount(combinations);
  });

  return tokens;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((value) =>
      value
        .match(/\d+/g)
        ?.map(Number)
        .map((num, i) => (i > 3 ? 10000000000000 + num : num)),
    ) as number[][];

  let tokens = 0;

  input.forEach(([aX, aY, bX, bY, pX, pY]: number[]) => {
    const a = (pX * bY - pY * bX) / (aX * bY - aY * bX);
    const b = (aX * pY - aY * pX) / (aX * bY - aY * bX);

    tokens += Number.isInteger(a) && Number.isInteger(b) ? a * 3 + b : 0;
  });

  return tokens;
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
