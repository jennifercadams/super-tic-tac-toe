import { BoardState, Move } from "~types";
import { Bot } from "./Bot";

export class RandomBot extends Bot {
    constructor() {
        super();
    }

    public getFirstMove(boards: BoardState[]): Move {
        const boardIndex = Math.floor(Math.random() * 9);
        const squareIndex = Math.floor(Math.random() * 9);

        return { currentMove: 0, boardIndex, squareIndex, boards };
    }

    public getNextMove(currentMove: number, boards: BoardState[]): Move {
        const boardIndex = this.getRandomBoardIndex(boards);
        const squareIndex = this.getRandomSquareIndex(boards[boardIndex].squares);

        return { currentMove, boardIndex, squareIndex, boards };
    }
}
