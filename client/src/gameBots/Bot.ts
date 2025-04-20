import { BoardState, Move } from "~types";

export class Bot {
    constructor() {
        if (this.constructor == Bot) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    public getFirstMove(_boards: BoardState[]): Move {
        throw new Error("Method 'getFirstMove()' must be implemented.");
    }

    public getNextMove(_currentMove: number, _boards: BoardState[]): Move {
        throw new Error("Method 'getNextMove()' must be implemented.");
    }

    protected getPlayableBoards(boards: BoardState[]) {
        return boards.map((_, i) => i).filter(v => boards[v].playable === true);
    }

    protected getPlayableSquares(squares: string[]) {
        return squares.map((_, i) => i).filter(v => !squares[v]);
    }

    protected getRandomBoardIndex(boards: BoardState[]) {
        const playableBoards = this.getPlayableBoards(boards);
        const randomBoardIndex = Math.floor(Math.random() * playableBoards.length);

        return playableBoards[randomBoardIndex];
    }

    protected getRandomSquareIndex(squares: string[]) {
        const playableSquares = this.getPlayableSquares(squares);
        const randomSquareIndex = Math.floor(Math.random() * playableSquares.length);

        return playableSquares[randomSquareIndex];
    }
}
