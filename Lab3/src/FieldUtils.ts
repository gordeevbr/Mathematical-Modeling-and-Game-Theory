import {Config} from "./Config";
import {GameState, IPly, Mark} from "./Domain";

export const noMoreFreeNodes = (field: Mark[][]) =>
  field.map((row) => row.findIndex((cell) => cell === Mark.NONE)).findIndex((index) => index !== -1) === -1;

export const copy = (oldField: Mark[][]) => {
  const field: Mark[][] = [];
  for (let i = 0; i < Config.height; i++) {
    field[i] = [];
    for (let j = 0; j < Config.width; j++) {
      field[i][j] = oldField[i][j];
    }
  }
  return field;
};

export const getStateAfterMove = (field: Mark[][], lastMove: IPly) => {
  const maxLength = runners.map((runner) => run(runner, field, lastMove)).reduce((a, b) => Math.max(a, b));
  if (maxLength >= Config.winLineSize) {
    return lastMove.mark === Mark.PLAYER ? GameState.PLAYER_WON : GameState.BOT_WON;
  } else {
    return noMoreFreeNodes(field) ? GameState.DRAW : GameState.IN_PROCESS;
  }
};

export const fieldDiff = (a: Mark[][], b: Mark[][]): [number, number] | null => {
  for (let i = 0; i < Config.height; i++) {
    for (let j = 0; j < Config.width; j++) {
      if (a[i][j] !== b[i][j]) {
        return [i, j];
      }
    }
  }
  return null;
};

interface IRunner {
  hasNext: (row: number, col: number) => boolean;
  hasPrev: (row: number, col: number) => boolean;
  next: (row: number, col: number) => [number, number];
  prev: (row: number, col: number) => [number, number];
}

const HorizontalRunner: IRunner = {
  hasNext: (row: number, col: number) => (col + 1) < Config.width,
  hasPrev: (row: number, col: number) => (col - 1) >= 0,
  next: (row: number, col: number) => [row, col + 1],
  prev: (row: number, col: number) => [row, col - 1],
};

const VerticalRunner: IRunner = {
  hasNext: (row: number) => (row + 1) < Config.height,
  hasPrev: (row: number) => (row - 1) >= 0,
  next: (row: number, col: number) => [row + 1, col],
  prev: (row: number, col: number) => [row - 1, col],
};

const DiagRunnerUpToDown: IRunner = {
  hasNext: (row: number, col: number) => (row + 1) < Config.height && (col + 1) < Config.width,
  hasPrev: (row: number, col: number) => (row - 1) >= 0 && (col - 1) >= 0,
  next: (row: number, col: number) => [row + 1, col + 1],
  prev: (row: number, col: number) => [row - 1, col - 1],
};

const DiagRunnerDownToUp: IRunner = {
  hasNext: (row: number, col: number) => (row - 1) >= 0 && (col + 1) < Config.width,
  hasPrev: (row: number, col: number) => (row + 1) < Config.height && (col - 1) >= 0,
  next: (row: number, col: number) => [row - 1, col + 1],
  prev: (row: number, col: number) => [row + 1, col - 1],
};

const runners: IRunner[] = [HorizontalRunner, VerticalRunner, DiagRunnerUpToDown, DiagRunnerDownToUp];

const run = (runner: IRunner, field: Mark[][], lastMove: IPly) => {
  let total = 1;
  const {mark} = lastMove;

  [[runner.next, runner.hasNext], [runner.prev, runner.hasPrev]].forEach((runnerConfig) => {
    let {row, col} = lastMove;
    while (runnerConfig[1](row, col)) {
      [row, col] = runnerConfig[0](row, col) as [number, number];
      if (field[row][col] === mark) {
        total++;
      } else {
        break;
      }
    }
  });

  return total;
};
