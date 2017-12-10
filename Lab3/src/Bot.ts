import {constructTree} from "./ConstructTree";
import {ITreeNode, Mark} from "./Domain";
import {fieldDiff} from "./FieldUtils";

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
      this.currentTreeNode.children.sort((a, b) => b.winRate - a.winRate)[0] :
      this.currentTreeNode.children.find((node) => fieldDiff(node.field, currentField) == null)
        .children.sort((a, b) => b.winRate - a.winRate)[0];

    const nextMove = fieldDiff(this.currentTreeNode.field, currentField);

    this.movedCallback(nextMove[0], nextMove[1]);
  }
}
