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

  let input: Map<number, number> = new Map();

  for (let i = 0; i < data.length; i++) input.set(+data[i], 1);

  for (let i = 0; i < 75; i++) {
    const newInput: Map<number, number> = new Map();

    for (const [value, count] of input) {
      const str = value.toString();

      if (!value) {
        newInput.set(1, (newInput.get(1) || 0) + count);
      } else if (!(str.length % 2)) {
        const one = str.slice(0, str.length / 2) + "";
        const two = str.slice(str.length / 2) + "";

        newInput.set(+one, (newInput.get(+one) || 0) + count);
        newInput.set(+two, (newInput.get(+two) || 0) + count);
      } else {
        newInput.set(value * 2024, (newInput.get(value * 2024) || 0) + count);
      }
    }

    input = newInput;
  }

  let result = 0;

  input.forEach((value) => (result += value));

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
