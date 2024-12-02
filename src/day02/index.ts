import run from "aocrunner";

const parseInput = (rawInput: string): string[][] =>
  rawInput.split("\n").map((report) => report.split(" "));

const isUnsafeDecrease = (current: number, prev: number): boolean =>
  current > prev || current + 3 < prev || current === prev;

const isUnsafeIncrease = (current: number, prev: number): boolean =>
  current < prev || current - 3 > prev || current === prev;

const isUnsafe = (decrease: boolean, current: number, prev: number): boolean =>
  decrease ? isUnsafeDecrease(current, prev) : isUnsafeIncrease(current, prev);

const findUnsafeIndex = (report: string[]): number =>
  report.findIndex(
    (level, i, self) =>
      !!i && isUnsafe(+report[0] > +report[1], +level, +self[i - 1]),
  );

const isSafe = (report: string[]): boolean => findUnsafeIndex(report) < 0;

const isSafeWithDampener = (report: string[]): boolean => {
  const index = findUnsafeIndex(report);

  return (
    !index ||
    isSafe(report.slice(1)) ||
    isSafe(report.slice(0, index).concat(report.slice(index + 1))) ||
    isSafe(report.slice(0, index - 1).concat(report.slice(index)))
  );
};

const part1 = (rawInput: string) => {
  const reports = parseInput(rawInput);

  const safeReports = reports.filter((report) => isSafe(report));

  return safeReports.length;
};

const part2 = (rawInput: string) => {
  const reports = parseInput(rawInput);

  const safeReports = reports.filter((report) => isSafeWithDampener(report));

  return safeReports.length;
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
