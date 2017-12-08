import {ITreeNode, Mark} from "./Domain";
import {constructTree} from "./ConstructTree";

export class Bot {

  private movedCallback: (row: number, col: number) => void;
  private treeTopNode: ITreeNode;
  private currentTreeNode: ITreeNode;

  constructor(movedCallback: (row: number, col: number) => void) {
    this.movedCallback = movedCallback;
    this.treeTopNode = this.currentTreeNode = constructTree();
  }

  public move(field: Mark[][]) {

  }
}
