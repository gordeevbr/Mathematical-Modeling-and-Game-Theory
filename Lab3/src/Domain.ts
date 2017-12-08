export enum Mark {
  NONE = "", PLAYER = "O", BOT = "X",
}

export enum GameState {
  IN_PROCESS, DRAW, PLAYER_WON, BOT_WON,
}

export interface IMove {
  mark: Mark;
  row: number;
  col: number;
}

export interface ITreeNode {
  winRate: number;
  drawRate: number;
  loseRate: number;
  row: number;
  col: number;
  mark: Mark;
}
