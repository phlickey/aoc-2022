import fs from "fs";

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const lines = input.split("\n");

type Elf = {
  meals: number[];
  total: number;
};

const elves: Elf[] = [];

let currentElf: Omit<Elf, "total"> = {
  meals: [],
};

lines.forEach((line) => {
  if (line) {
    currentElf.meals.push(parseInt(line));
  } else {
    const total = currentElf.meals.reduce((total, current) => total + current);
    elves.push({ ...currentElf, total });
    currentElf = {
      meals: [],
    };
  }
});

const sortedElves = [...elves.sort((elfA, elfB) => elfB.total - elfA.total)];

const [one, two, three] = sortedElves;

const total = one.total + two.total + three.total;

console.log({ total });
