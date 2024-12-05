import run from "aocrunner";

const parseInput = (rawInput: string): [string[], string[]] => {
  const input = rawInput.split("\n");
  const split = input.indexOf("");
  return [input.slice(0, split), input.slice(split + 1)];
};

type PageOrder = Record<number, { before: number[]; after: number[] }>;

const pageOrderRules = (rules: string[]): PageOrder =>
  rules.reduce((pageOrder, rule) => {
    const [before, after] = rule.split("|").map(Number);

    pageOrder[before] ??= { before: [], after: [] };
    pageOrder[after] ??= { before: [], after: [] };

    pageOrder[before].after.push(after);
    pageOrder[after].before.push(before);

    return pageOrder;
  }, {} as PageOrder);

const sortInstruction = (instruction: string[], orderRules: PageOrder) => {
  for (let i = 0; i < instruction.length; i++) {
    for (let j = 0; j < instruction.length - i - 1; j++) {
      const { before } = orderRules[+instruction[j]] || {};

      if (before.includes(+instruction[j + 1])) {
        const lesser = instruction[j + 1];
        instruction[j + 1] = instruction[j];
        instruction[j] = lesser;
      }
    }
  }
  return instruction;
};

const part1 = (rawInput: string) => {
  const [rules, instructions] = parseInput(rawInput);

  const orderRules = pageOrderRules(rules);

  let result = 0;

  instructions.forEach((item) => {
    const insruction = item.split(",");

    result += insruction
      .map((value, i, self) => {
        const { before, after } = orderRules[+value] || {};

        return (
          self.slice(0, i).every((value) => before.includes(+value)) &&
          self.slice(i + 1).every((value) => after.includes(+value))
        );
      })
      .every(Boolean)
      ? +insruction[Math.floor(insruction.length / 2)]
      : 0;
  });

  return result;
};

const part2 = (rawInput: string) => {
  const [rules, instructions] = parseInput(rawInput);

  const orderRules = pageOrderRules(rules);

  let result = 0;

  instructions.forEach((instruction) => {
    const instructionArray = instruction.split(",");

    const checkInstruction = instructionArray.map((value, i, self) => {
      const { before, after } = orderRules[+value] || {};

      return (
        self.slice(0, i).every((value) => before.includes(+value)) &&
        self.slice(i + 1).every((value) => after.includes(+value))
      );
    });

    if (!checkInstruction.every(Boolean)) {
      const sorted = sortInstruction(instructionArray, orderRules);
      result += +sorted[Math.floor(sorted.length / 2)];
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
