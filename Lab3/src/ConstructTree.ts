import {ITreeNode, Mark} from "./Domain";

export const constructTree = (): ITreeNode => {
  return {
    col: -1,
    drawRate: -1,
    loseRate: -1,
    mark: Mark.NONE,
    row: -1,
    winRate: -1,
  };
};
