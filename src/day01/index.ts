import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const listSort = (list: number[]): number[] => list.sort((a, b) => a - b);

const getSimilarityScore = (num: number, list: number[]) =>
  list.filter((n) => n === num).length;

const getLists = (input: string[]): [number[], number[]] => {
  const list1: number[] = [];
  const list2: number[] = [];

  input.forEach((num) =>
    num
      .split(" ")
      .filter(Boolean)
      .forEach((num, i) => (i === 0 ? list1.push(+num) : list2.push(+num))),
  );

  return [list1, list2];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const [list1, list2] = getLists(input).map(listSort);

  let result = list1.reduce(
    (acc, curr, i) => Math.abs(curr - list2[i]) + acc,
    0,
  );

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const [list1, list2] = getLists(input).map(listSort);

  let result = list1.reduce(
    (acc, curr) => curr * getSimilarityScore(curr, list2) + acc,
    0,
  );

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
