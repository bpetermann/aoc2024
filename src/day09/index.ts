import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const data = parseInput(rawInput).split("").map(Number);

  let input: (number | string)[] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < +data[i]; j++) {
      input.push(!(i % 2) ? i / 2 : `.`);
    }
  }

  while (true) {
    const firstEmptySlot = input.findIndex((value) => value === ".");

    if (input.slice(firstEmptySlot).every((value) => value === ".")) break;

    let lastNumberIndex: number = 0;

    for (let i = input.length - 1; i > 0; i--) {
      if (input[i] !== ".") {
        lastNumberIndex = i;
        break;
      }
    }

    input[firstEmptySlot] = input[lastNumberIndex];
    input[lastNumberIndex] = ".";
  }

  let result = 0;

  input.forEach((block, id) => {
    if (block !== ".") {
      result += (block as number) * id;
    }
  });

  return result;
};

const part2 = (rawInput: string) => {
  const data = parseInput(rawInput).split("").map(Number);

  const input: (string | number)[][] = [];

  for (let i = 0; i < data.length; i++) {
    const file: (number | string)[] = [];

    for (let j = data[i]; j > 0; j--) {
      if (i % 2 === 0) {
        file.push(i / 2);
      } else {
        file.push(".");
      }
    }

    if (file.length) {
      input.push(file);
    }
  }

  const moved: (number | string)[] = [];

  outer: for (let i = input.length - 1; i >= 0; i--) {
    if (input[i][0] !== "." && !moved.includes(input[i][0])) {
      for (let j = 0; j <= i; j++) {
        if (input[j][0] === "." && input[j].length >= input[i].length) {
          if (input[j].length === input[i].length) {
            moved.push(input[i][0]);
            const temp = [...input[j]];
            input[j] = input[i];
            input[i] = temp;
            continue outer;
          } else {
            moved.push(input[i][0]);
            const temp = [...input[i]];
            input[i].fill(".");
            input.splice(j, 1, temp, input[j].slice(input[i].length));
            i++;
            continue outer;
          }
        }
      }
    }
  }

  let result = 0;

  input.flat().forEach((block, id) => {
    if (typeof block === "number") {
      result += block * id;
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
