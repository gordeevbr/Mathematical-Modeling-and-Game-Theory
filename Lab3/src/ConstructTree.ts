import {Config} from "./Config";
import {GameState, ITreeNode, Mark} from "./Domain";
import {copy, getStateAfterMove} from "./FieldUtils";

export const constructTree = (): ITreeNode => {
  const startingMark: Mark = Config.playerGoesFirst ? Mark.BOT : Mark.PLAYER;
  const startingField: Mark[][] = [];

  for (let i = 0; i < Config.height; i++) {
    startingField[i] = [];
    for (let j = 0; j < Config.width; j++) {
      startingField[i][j] = Mark.NONE;
    }
  }

  const rootNode: ITreeNode = {
    children: [],
    col: -1,
    mark: Mark.NONE,
    row: -1,
    winRate: 0,
  };

  parseNode(rootNode, startingField, startingMark);

  return rootNode;
};

const parseNode = (node: ITreeNode, field: Mark[][], mark: Mark) => {
  const nextMark = mark === Mark.BOT ? Mark.PLAYER : Mark.BOT;

  for (let i = 0; i < Config.height; i++) {
    for (let j = 0; j < Config.width; j++) {
      if (field[i][j] === Mark.NONE) {
        const nextField = copy(field);
        nextField[i][j] = nextMark;
        const nextNode: ITreeNode = {
          children: [],
          col: j,
          mark: nextMark,
          row: i,
          winRate: 0,
        };

        node.children.push(nextNode);

        const result = getStateAfterMove(nextField, {mark: nextMark, row: i, col: j});

        switch (result) {
          case GameState.IN_PROCESS:
            parseNode(nextNode, nextField, nextMark);
            break;
          case GameState.BOT_WON:
            nextNode.winRate = 1;
            break;
          case GameState.PLAYER_WON:
            nextNode.winRate = -1;
            break;
        }
      }
    }
  }

  node.winRate = node.children
    .sort((a, b) => nextMark === Mark.BOT ? b.winRate - a.winRate : a.winRate - b.winRate)[0].winRate;
};
