import fs from "fs";

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const rows = input.split("\n");

type Group = {
  first: string;
  second: string;
  third: string;
  duplicate: string;
  priority: number;
};

const findDupes = (firstBack: string, secondBag: string) => {
  const common = [];
  const firstPocketSet = new Set(firstBack.split(""));

  for (let char of secondBag.split("")) {
    if (firstPocketSet.has(char)) {
      common.push(char);
    }
  }

  return common.join("");
};

const scoreChar = (char: string) => {
  const asciiCode = char.charCodeAt(0);
  if (asciiCode >= 65 && asciiCode <= 90) {
    //uppercase chars
    return asciiCode - 65 + 27;
  } else if (asciiCode >= 97 && asciiCode <= 122) {
    // lowercase chars
    return asciiCode - 97 + 1;
  }
  throw new Error(`${char} is out of range`);
};

const groups: Group[] = [];

for (let i = 0; i < rows.length; i += 3) {
  const first = rows[i];
  const second = rows[i + 1];
  const third = rows[i + 2];

  const firstAndSecondOverlap = findDupes(first, second);
  const allOverlaps = findDupes(firstAndSecondOverlap, third);

  groups.push({
    first,
    second,
    third,
    duplicate: allOverlaps,
    priority: scoreChar(allOverlaps),
  });
}

console.log(groups.reduce((total, current) => total + current.priority, 0));
