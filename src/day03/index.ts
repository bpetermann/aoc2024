import run from "aocrunner";

const MUL_START = "mul(";
const DO = "do()";
const DONT = "don't()";

const parseInput = (rawInput: string) => rawInput;

const isMul = (value: string) => value.startsWith(MUL_START);

const checkNum = (current: string, seqEndSymbol: string, number: string) =>
  current !== seqEndSymbol || number.length > 3 ? null : number;

const getNumString = (index: number, value: string, seqEndSymbol: string) => {
  let number = "";

  while (!isNaN(+value[index])) {
    number += value[index];
    index++;
  }

  return checkNum(value[index], seqEndSymbol, number);
};

const getMulSum = (value: string) => {
  const number1 = getNumString(0, value, ",");

  if (!number1) return 0;

  const number2 = getNumString(number1.length + 1, value, ")");

  if (!number2) return 0;

  return +number1 * +number2;
};

const isActivated = (value: string) =>
  value.startsWith(DO) ? true : value.startsWith(DONT) ? false : undefined;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("");

  let result = 0;

  input.forEach((value, i, self) => {
    if (value === "m" && isMul(self.slice(i, i + 4).join("")))
      result += getMulSum(self.slice(i + 4, i + 12).join(""));
  });

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("");

  let result = 0;

  let isEnabled = true;

  input.forEach((value, i, self) => {
    if (value === "m" && isEnabled && isMul(self.slice(i, i + 4).join("")))
      result += getMulSum(self.slice(i + 4, i + 12).join(""));
    else if (value === "d")
      isEnabled = isActivated(self.slice(i, i + 7).join("")) ?? isEnabled;
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
