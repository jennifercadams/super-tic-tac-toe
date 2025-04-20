import { BoardState, Move, Player } from "~types";
import { Bot } from "./Bot";

export class RandomBot extends Bot {
    constructor(humanPlayer: Player) {
        super(humanPlayer);
    }

    public getFirstMove(boards: BoardState[]): Move {
        return this.getRandomFirstMove(boards);
    }

    public getNextMove(currentMove: number, boards: BoardState[]): Move {
        const boardIndex = this.getRandomBoardIndex(boards);
        const squareIndex = this.getRandomSquareIndex(boards[boardIndex].squares);

        return { currentMove, boardIndex, squareIndex, boards };
    }
}
