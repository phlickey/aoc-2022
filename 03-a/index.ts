import fs from "fs";

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const rows = input.split("\n");

type RuckSack = {
  left: string;
  right: string;
  duplicate: string;
  priority: number;
};

const findDupe = (firstPocket: string, secondPocket: string) => {
  const firstPocketSet = new Set(firstPocket.split(""));

  for (let char of secondPocket.split("")) {
    if (firstPocketSet.has(char)) return char;
  }

  throw new Error("no dupe found");
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

const ruckSacks: RuckSack[] = rows.map((row) => {
  const length = row.length;
  const left = row.slice(0, length / 2);
  const right = row.slice(length / 2);

  const duplicate = findDupe(left, right);

  const priority = scoreChar(duplicate);

  return {
    left,
    right,
    duplicate,
    priority,
  };
});

console.log(ruckSacks.reduce((total, current) => total + current.priority, 0));
