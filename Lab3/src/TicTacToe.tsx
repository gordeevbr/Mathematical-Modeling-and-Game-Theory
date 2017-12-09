import * as React from "react";

import {Bot} from "./Bot";
import {Config} from "./Config";
import {GameState, IPly, Mark} from "./Domain";
import {copy, getStateAfterMove} from "./FieldUtils";

export interface ITicTacToeState {
  field: Mark[][];
  bot: Bot;
  gameState: GameState;
  log: IPly[];
}

export class TicTacToe extends React.Component<{}, ITicTacToeState> {

  public componentWillMount() {
    const field: Mark[][] = [];

    for (let i = 0; i < Config.height; i++) {
      field[i] = [];
      for (let j = 0; j < Config.width; j++) {
        field[i][j] = Mark.NONE;
      }
    }

    const bot = new Bot((row, col) => this.botMoved(row, col));

    this.setState(
      {field, bot, gameState: GameState.IN_PROCESS, log: []},
      () => Config.playerGoesFirst ? null : bot.move(),
    );
  }

  public render() {
    return (
      <table>
        <tbody>
        {this.generateRows()}
        </tbody>
      </table>
    );
  }

  private generateRows() {
    const rows = [];

    for (let i = 0; i < Config.height; i++) {
      rows.push(
        <tr key={i}>
          {this.generateCols(i)}
        </tr>,
      );
    }

    return rows;
  }

  private generateCols(row: number) {
    const cols = [];

    for (let i = 0; i < Config.width; i++) {
      cols.push(
        <td key={i}>
          <button
            className={"tic-tac-toe-button"}
            onClick={() => this.buttonClicked(row, i)}
          >
            {this.state.field[row][i]}
          </button>
        </td>,
      );
    }

    return cols;
  }

  private placeMark(prevState: ITicTacToeState, mark: Mark, row: number, col: number) {
    const field = copy(prevState.field);
    field[row][col] = mark;

    const newMove = {row, col, mark};

    const log = [...prevState.log];
    log.push(newMove);

    const gameState = getStateAfterMove(field, newMove);

    return {...prevState, field, log, gameState};
  }

  private buttonClicked(row: number, col: number) {
    if (this.state.field[row][col] === Mark.NONE && this.state.gameState === GameState.IN_PROCESS) {
      this.setState(
        (prevState) => this.placeMark(prevState, Mark.PLAYER, row, col),
        () => this.botMove(),
      );
    }
  }

  private botMove() {
    if (this.state.gameState === GameState.IN_PROCESS) {
      this.state.bot.move(this.state.log[this.state.log.length - 1]);
    }
  }

  private botMoved(row: number, col: number) {
    this.setState(
      (prevState) => this.placeMark(prevState, Mark.BOT, row, col),
    );
  }
}
