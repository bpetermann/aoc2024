import run from "aocrunner";

enum Direction {
  North,
  East,
  South,
  West,
}

type Position = [number, number];

type Guard = {
  position: Position;
  direction: Direction;
  path: Position[];
};

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((item) => item.split(""));

const getStartPosition = (input: string[][]) => {
  const start: Position = [0, 0];

  input.forEach((line, i) => {
    const startPosition = line.findIndex((field) => field === "^");

    if (startPosition > 0) {
      start[0] = i;
      start[1] = startPosition;
    }
  });

  return start;
};

const getGuard = (input: string[][]) => {
  const startPosition = getStartPosition(input);

  return {
    position: startPosition,
    direction: Direction.North,
    path: [startPosition],
  };
};

const isOutsideMap = (input: string[][], [x, y]: Position) => {
  return x > input.length - 1 || x < 0 || y > input[0].length - 1 || y < 0;
};

const newPostion = ({ direction, position }: Guard): Position => {
  const [x, y] = position;
  switch (direction) {
    case Direction.North:
      return [x - 1, y];
    case Direction.East:
      return [x, y + 1];
    case Direction.South:
      return [x + 1, y];
    case Direction.West:
      return [x, y - 1];
  }
};

const newDirection = (direction: Direction): Direction =>
  direction === 3 ? 0 : direction + 1;

const isDistinct = (path: Position[], position: Position) =>
  path.findIndex(([x, y]) => x === position[0] && y === position[1]) !== -1;

const nextStep = (input: string[][], guard: Guard) => {
  const [x, y] = newPostion(guard);
  return input[x][y];
};

const uniqueSteps = (path: Position[]) =>
  path.filter((position, i, self) => !isDistinct(self.slice(0, i), position))
    .length;

const walk = (guard: Guard, input: string[][]) => {
  if (isOutsideMap(input, newPostion(guard))) return guard;

  while (
    !isOutsideMap(input, newPostion(guard)) &&
    nextStep(input, guard) !== "#"
  ) {
    guard.position = newPostion(guard);
    guard.path.push(guard.position);
  }

  if (isOutsideMap(input, newPostion(guard))) return guard;

  guard.direction = newDirection(guard.direction);

  walk(guard, input);

  return guard;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const guard = getGuard(input);
  const { path } = walk(guard, input);

  return uniqueSteps(path);
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
