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
type Result = "w" | "l" | "d";

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
  const desiredResult = parseResult(me);
  const myMove = inferMove(opponentMove, desiredResult);
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

const parseResult = (input: string): Result => {
  switch (input) {
    case "X":
      return "l";
    case "Y":
      return "d";
    case "Z":
      return "w";
  }
  throw new Error(`${input} ain't it chief`);
};

const inferMove = (opponentMove: Move, desiredResult: Result): Move => {
  if (desiredResult === "d") return opponentMove;

  if (desiredResult === "w") {
    switch (opponentMove) {
      case "r":
        return "p"; // paper covers rock
      case "p":
        return "s"; // scissors cuts paper
      case "s":
        return "r"; // rock breaks scissors
    }
  }

  switch (opponentMove) {
    case "r":
      return "s"; // rock breaks scissors
    case "p":
      return "r"; // paper covers rock
    case "s":
      return "p"; // scissors cuts paper
  }
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
