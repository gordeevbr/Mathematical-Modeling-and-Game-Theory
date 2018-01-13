export enum Mark {
  NONE = " ", PLAYER = "O", BOT = "X",
}

export enum GameState {
  IN_PROCESS = 0, DRAW = 1, PLAYER_WON = 2, BOT_WON = 3,
}

export interface IPly {
  mark: Mark;
  row: number;
  col: number;
}

export interface ITreeNode {
  winRate: number;
  movesLeft: number;
  mark: Mark;
  children: ITreeNode[];
  field: Mark[][];
}
