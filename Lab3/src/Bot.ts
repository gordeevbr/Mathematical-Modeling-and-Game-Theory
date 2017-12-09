import {constructTree} from "./ConstructTree";
import {IPly, ITreeNode} from "./Domain";

export class Bot {

  private movedCallback: (row: number, col: number) => void;
  private treeTopNode: ITreeNode;
  private currentTreeNode: ITreeNode;

  constructor(movedCallback: (row: number, col: number) => void) {
    this.movedCallback = movedCallback;
    this.treeTopNode = this.currentTreeNode = constructTree();
  }

  public move(lastPly?: IPly) {
    this.currentTreeNode = lastPly == null ?
      this.currentTreeNode.children.sort((a, b) => b.winRate - a.winRate)[0] :
      this.currentTreeNode.children.find((node) => node.col === lastPly.col && node.row === lastPly.row)
        .children.sort((a, b) => b.winRate - a.winRate)[0];

    this.movedCallback(this.currentTreeNode.row, this.currentTreeNode.col);
  }
}
