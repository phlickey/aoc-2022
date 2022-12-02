import fs from "fs";

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const rows = input.split("\n");

const POINTS_FOR_WIN = 6;
const POINTS_FOR_DRAW = 3;
const POINTS_FOR_LOSS = 0;

const POINTS_FOR_ROCK = 1;
const POINTS_FOR_PAPER = 2;
const POINTS_FOR_SCISSORS = 3;

type Move = "r" | "p" | "s";

const movePoints: Record<Move, number> = {
  r: POINTS_FOR_ROCK,
  p: POINTS_FOR_PAPER,
  s: POINTS_FOR_SCISSORS,
};

type Match = {
  opponent: Move;
  me: Move;
  result: number;
};

const parseRow = (row: string): Match => {
  const [opponent, me] = row.split(" ");
  const opponentMove = parseOpponentRow(opponent);
  const myMove = parseMyRow(me);

  const matchPoints = getMatchPoints(opponentMove, myMove);

  return {
    opponent: opponentMove,
    me: myMove,
    result: matchPoints + movePoints[myMove],
  };
};

const parseOpponentRow = (input: string): Move => {
  switch (input) {
    case "A":
      return "r";
    case "B":
      return "p";
    case "C":
      return "s";
  }
  throw new Error(`${input} ain't it chief`);
};

const parseMyRow = (input: string): Move => {
  switch (input) {
    case "X":
      return "r";
    case "Y":
      return "p";
    case "Z":
      return "s";
  }
  throw new Error(`${input} ain't it chief`);
};

const getMatchPoints = (opponent: Move, me: Move) => {
  if (opponent === me) {
    return POINTS_FOR_DRAW;
  }

  if (
    (opponent === "p" && me === "r") || // paper covers rock
    (opponent === "r" && me === "s") || // rock breaks scissors
    (opponent === "s" && me === "p") // scissors cuts paper
  )
    return POINTS_FOR_LOSS;

  // if i didn't draw or lose then i won
  return POINTS_FOR_WIN;
};

const matches = rows.map((row) => parseRow(row));

const total = matches.reduce((sum, current) => sum + current.result, 0);

console.log(total);
