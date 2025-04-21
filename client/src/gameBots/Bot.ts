import { BoardState, Move, Player } from "~types";

export class Bot {
    protected humanPlayer: Player;
    protected botPlayer: Player;

    constructor(humanPlayer: Player) {
        if (this.constructor == Bot) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.humanPlayer = humanPlayer;
        this.botPlayer = humanPlayer === Player.X ? Player.O : Player.X;
    }

    public getFirstMove(_boards: BoardState[]): Move {
        throw new Error("Method 'getFirstMove()' must be implemented.");
    }

    public getNextMove(_currentMove: number, _boards: BoardState[]): Move {
        throw new Error("Method 'getNextMove()' must be implemented.");
    }

    protected getRandomFirstMove(boards: BoardState[]): Move {
        const boardIndex = Math.floor(Math.random() * 9);
        const squareIndex = Math.floor(Math.random() * 9);

        return { currentMove: 0, boardIndex, squareIndex, boards };
    }

    protected getPlayableBoards(boards: BoardState[]): number[] {
        return boards.map((_, i) => i).filter(v => boards[v].playable === true);
    }

    protected getPlayableSquares(squares: string[]): number[] {
        return squares.map((_, i) => i).filter(v => !squares[v]);
    }

    protected getRandomBoardIndex(boards: BoardState[]): number {
        const playableBoards = this.getPlayableBoards(boards);
        const randomBoardIndex = Math.floor(Math.random() * playableBoards.length);

        return playableBoards[randomBoardIndex];
    }

    protected getRandomSquareIndex(squares: string[]): number {
        const playableSquares = this.getPlayableSquares(squares);
        const randomSquareIndex = Math.floor(Math.random() * playableSquares.length);

        return playableSquares[randomSquareIndex];
    }
}
