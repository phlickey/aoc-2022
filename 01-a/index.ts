import fs from "fs";

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const lines = input.split("\n");

type Elf = {
  meals: number[];
};

const elves: Elf[] = [];

let currentElf: Elf = {
  meals: [],
};
lines.forEach((line) => {
  if (line) {
    currentElf.meals.push(parseInt(line));
  } else {
    elves.push(currentElf);
    currentElf = {
      meals: [],
    };
  }
});

const max = elves
  .map((elf) => elf.meals.reduce((total, current) => total + current))
  .reduce((max, current) => Math.max(max, current));

console.log({ max });
