import {Config} from "./Config";
import {GameState, ITreeNode, Mark} from "./Domain";
import {copy, getStateAfterMove} from "./FieldUtils";

const nodeCache: Map<string, ITreeNode> = new Map();

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
    field: startingField,
    mark: Mark.NONE,
    winRate: 0,
  };

  parseNode(rootNode, startingField, startingMark);

  return rootNode;
};

const createNode = (row: number, col: number, field: Mark[][], mark: Mark, key: string) => {
  const nextNode: ITreeNode = {
    children: [],
    field,
    mark,
    winRate: 0,
  };

  const result = getStateAfterMove(field, {mark, row, col});

  switch (result) {
    case GameState.IN_PROCESS:
      parseNode(nextNode, field, mark);
      break;
    case GameState.BOT_WON:
      nextNode.winRate = 1;
      break;
    case GameState.PLAYER_WON:
      nextNode.winRate = -1;
      break;
  }

  nodeCache.set(key, nextNode);

  return nextNode;
};

const getKey = (field: Mark[][]) => field.map((row) => row.join("")).join("");

const parseNode = (node: ITreeNode, field: Mark[][], mark: Mark) => {
  const nextMark = mark === Mark.BOT ? Mark.PLAYER : Mark.BOT;

  for (let i = 0; i < Config.height; i++) {
    for (let j = 0; j < Config.width; j++) {
      if (field[i][j] === Mark.NONE) {
        const nextField = copy(field);
        nextField[i][j] = nextMark;
        const key = getKey(nextField);
        node.children.push(nodeCache.has(key) ? nodeCache.get(key) : createNode(i, j, nextField, nextMark, key));
      }
    }
  }

  node.winRate = node.children
    .sort((a, b) => nextMark === Mark.BOT ? b.winRate - a.winRate : a.winRate - b.winRate)[0].winRate;
};
