import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("");

  let newInput: string[] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < +input[i]; j++) {
      newInput.push(!(i % 2) ? `${i / 2}` : `.`);
    }
  }

  while (true) {
    const emptySlot = newInput.findIndex((value) => value === ".");

    if (newInput.slice(emptySlot).every((value) => value === ".")) break;

    let lastNumberIndex: number = 0;

    for (let i = newInput.length - 1; i > 0; i--) {
      if (newInput[i] !== ".") {
        lastNumberIndex = i;
        break;
      }
    }

    newInput[emptySlot] = newInput[lastNumberIndex];
    newInput[lastNumberIndex] = ".";
  }

  const result = newInput
    .filter((value) => value !== ".")
    .reduce((prev, current, i) => +prev + +current * i, 0);

  return result;
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
