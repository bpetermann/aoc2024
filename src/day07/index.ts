import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((num) => num.split(" "));

const results = (
  numbers: string[],
  combiner: (a: number, b: number) => number[],
) => {
  const initialElements = numbers.splice(0, 2).map(Number);

  if (initialElements.length < 2) return [];

  let results = combiner(initialElements[0], initialElements[1]);

  numbers.forEach((num) => {
    results = results.flatMap((n) => combiner(n, +num));
  });

  return results;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const combiner = (a: number, b: number) => [a * b, a + b];

  let count: number = 0;

  for (let index = 0; index < input.length; index++) {
    const result = +input[index][0].split(":")[0];
    const numbers = input[index].slice(1);

    if (results(numbers, combiner).includes(result)) {
      count += result;
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const combiner = (a: number, b: number) => [a * b, a + b, +(a + "" + b)];

  let count: number = 0;

  for (let index = 0; index < input.length; index++) {
    const result = +input[index][0].split(":")[0];
    const numbers = input[index].slice(1);

    if (results(numbers, combiner).includes(result)) {
      count += result;
    }
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
