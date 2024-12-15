import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let input: string[] = parseInput(rawInput).split(" ");

  for (let i = 0; i < 25; i++)
    input = input.flatMap((v) =>
      !+v
        ? "1"
        : !(v.length % 2)
        ? [+v.slice(0, v.length / 2) + "", +v.slice(v.length / 2) + ""]
        : +v * 2024 + "",
    );

  return input.length;
};

const part2 = (rawInput: string) => {
  const data = parseInput(rawInput).split(" ");

  let input: { [key: string]: number } = {};

  for (let i = 0; i < data.length; i++) input[data[i]] = 1;

  for (let i = 0; i < 75; i++) {
    const newInput: { [k: string]: number } = {};

    for (const [value, count] of Object.entries(input)) {
      if (!+value) {
        newInput[1] = count;
      } else if (!(value.length % 2)) {
        const one = +value.slice(0, value.length / 2) + "";
        const two = +value.slice(value.length / 2) + "";

        newInput[one] = (newInput[one] || 0) + count;
        newInput[two] = (newInput[two] || 0) + count;
      } else {
        const newValue = +value * 2024 + "";
        newInput[newValue] = (newInput[newValue] || 0) + count;
      }
    }
    input = newInput;
  }

  return Object.values(input).reduce((prev, current) => prev + current, 0);
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
