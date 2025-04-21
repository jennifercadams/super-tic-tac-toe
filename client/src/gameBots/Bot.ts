import { winStates } from "~constants";
import { BoardLocation, BoardState, Player } from "~types";

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

    public getFirstMove(): BoardLocation {
        throw new Error("Method 'getFirstMove()' must be implemented.");
    }

    public getNextMove(_boards: BoardState[]): BoardLocation {
        throw new Error("Method 'getNextMove()' must be implemented.");
    }

    protected getRandomFirstMove(): BoardLocation {
        const boardIndex = Math.floor(Math.random() * 9);
        const squareIndex = Math.floor(Math.random() * 9);

        return { boardIndex, squareIndex };
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

    protected getWinningMoves(player: Player, boards: BoardState[]): BoardLocation[] {
        const winningMoves: BoardLocation[] = [];

        const wonBoards = boards.map((_, i) => i).filter(v => boards[v].winner === player);
        if (wonBoards.length < 2)
            return winningMoves;

        const possibleWinningBoards: number[] = [];

        for (const winState of winStates) {
            const [a, b, c] = winState;
            const line = [ boards[a].winner, boards[b].winner, boards[c].winner ];
            const numWonByPlayer = line.filter(v => v === player).length;

            if (numWonByPlayer !== 2)
                continue;

            const playable = winState.filter(v => boards[v].winner === null);
            if (playable.length === 1) {
                possibleWinningBoards.push(playable[0]);
            }
        }

        for (const boardIndex of possibleWinningBoards) {
            const squares = boards[boardIndex].squares;
            for (const winState of winStates) {
                const [a, b, c] = winState;
                const line = [ squares[a], squares[b], squares[c] ];
                const numMarkedByPlayer = line.filter(v => v === player).length;

                if (numMarkedByPlayer !== 2)
                    continue;

                const playable = winState.filter(v => squares[v] === "");
                if (playable.length === 1) {
                    const squareIndex = playable[0];
                    winningMoves.push({ boardIndex, squareIndex });
                }
            }
        }

        return winningMoves;
    }
}
