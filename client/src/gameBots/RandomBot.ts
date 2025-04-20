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
        const playableBoards: number[] = boards.map((_, i) => i)
            .filter(v => boards[v].playable === true);
        const randomBoardIndex = Math.floor(Math.random() * playableBoards.length);
        const boardIndex = playableBoards[randomBoardIndex];

        const playableSquares: number[] = boards[boardIndex].squares.map((_, i) => i)
            .filter(v => !boards[boardIndex].squares[v]);
        const randomSquareIndex = Math.floor(Math.random() * playableSquares.length);
        const squareIndex = playableSquares[randomSquareIndex];

        return { currentMove, boardIndex, squareIndex, boards };
    }
}
