import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let input: string[] = parseInput(rawInput).split(" ");

  const splitInHalf = (value: string): [string, string] => {
    const value1 = +value.slice(0, value.length / 2);
    const value2 = +value.slice(value.length / 2);

    return [value1.toString(), value2.toString()];
  };

  for (let i = 0; i < 25; i++) {
    input = input.flatMap((value) => {
      switch (true) {
        case value === "0":
          return "1";
        case +value.length % 2 === 0:
          return splitInHalf(value);
        default:
          return +value * 2024 + "";
      }
    });
  }

  return input.length;
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
