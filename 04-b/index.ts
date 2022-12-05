import fs from "fs";

const raw = fs.readFileSync("input.txt", { encoding: "utf-8" });
const rows = raw.split("\n");

type Range = {
  min: number;
  max: number;
};
type Row = {
  ranges: [Range, Range];
  overlap: boolean;
};
const parseAsRange = (input: string): Range => {
  const [min, max] = input.split("-").map((str) => parseInt(str));

  return {
    min,
    max,
  };
};

const compareCompleteOverlap = (a: Range, b: Range) =>
  a.max >= b.max && a.min <= b.min;

const compareAnyOverlap = (a: Range, b: Range) => {
  return a.max >= b.min;
};

const ranges = rows.map((row) => {
  const [firstStr, secondStr] = row.split(",");
  const firstRange = parseAsRange(firstStr);
  const secondRange = parseAsRange(secondStr);

  const completeOverlaps =
    compareCompleteOverlap(secondRange, firstRange) ||
    compareCompleteOverlap(firstRange, secondRange);

  const overlaps =
    compareAnyOverlap(secondRange, firstRange) &&
    compareAnyOverlap(firstRange, secondRange);

  if (overlaps) {
    console.log(firstRange, secondRange);
  }

  return {
    ranges: [firstRange, secondRange],
    completeOverlaps,
    overlaps,
  };
});

console.log(
  ranges.filter(({ overlaps }) => overlaps).length,
  ranges.filter(({ completeOverlaps }) => completeOverlaps).length
);
