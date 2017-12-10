import {constructTree} from "./ConstructTree";
import {ITreeNode, Mark} from "./Domain";
import {fieldDiff} from "./FieldUtils";

const bestNodeComparator = (a: ITreeNode, b: ITreeNode) => Math.abs(b.winRate - a.winRate) < 0.001 ?
  a.movesLeft - b.movesLeft : b.winRate - a.winRate;

export class Bot {

  private movedCallback: (row: number, col: number) => void;
  private treeTopNode: ITreeNode;
  private currentTreeNode: ITreeNode;

  constructor(movedCallback: (row: number, col: number) => void) {
    this.movedCallback = movedCallback;
    this.treeTopNode = this.currentTreeNode = constructTree();
  }

  public move(currentField: Mark[][], movesSoFar: number) {
    this.currentTreeNode = movesSoFar === 0 ?
      this.currentTreeNode.children.sort(bestNodeComparator)[0] :
      this.currentTreeNode.children.find((node) => fieldDiff(node.field, currentField) == null)
        .children.sort(bestNodeComparator)[0];

    const nextMove = fieldDiff(this.currentTreeNode.field, currentField);

    this.movedCallback(nextMove[0], nextMove[1]);
  }
}
