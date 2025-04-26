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

    protected getWinningMovesForGame(player: Player, boards: BoardState[]): BoardLocation[] {
        const wonBoards = boards.map((_, i) => i).filter(v => boards[v].winner === player);
        if (wonBoards.length < 2)
            return [];

        const possibleWinningBoards: number[] = [];

        for (const winState of winStates) {
            const squares = boards.map(v => v.winner || "");
            const winningIndex = this.getWinningIndex(player, squares, winState);
            if (winningIndex !== null) {
                possibleWinningBoards.push(winningIndex);
            }
        }

        return this.getWinningMoves(player, boards, possibleWinningBoards);
    }

    protected getWinningMovesForBoard(player: Player, boards: BoardState[]): BoardLocation[] {
        const playableBoards = this.getPlayableBoards(boards);
        return this.getWinningMoves(player, boards, playableBoards);
    }

    protected getWinningMoves(player: Player, boards: BoardState[], boardsToCheck: number[]): BoardLocation[] {
        const winningMoves: BoardLocation[] = [];

        for (const boardIndex of boardsToCheck) {
            const squares = boards[boardIndex].squares;
            for (const winState of winStates) {
                const winningIndex = this.getWinningIndex(player, squares, winState);
                if (winningIndex !== null) {
                    winningMoves.push({ boardIndex, squareIndex: winningIndex });
                }
            }
        }

        return winningMoves;
    }

    private getWinningIndex(player: Player, squares: string[], winState: [number,number,number]): (number | null) {
        const [a, b, c] = winState;
        const line = [ squares[a], squares[b], squares[c] ];
        const numMarkedByPlayer = line.filter(v => v === player).length;

        if (numMarkedByPlayer !== 2)
            return null;

        const playable = winState.filter(v => squares[v] === "");
        if (playable.length === 1)
            return playable[0];
        else
            return null;
    }

    protected getSafeMoves(boards: BoardState[], moveSet: BoardLocation[], boardsToAvoid: number[]): BoardLocation[] {
        if (boardsToAvoid.length < 1)
            return moveSet;

        return moveSet.filter(move => {
            const nextBoardHasWinner = boards[move.squareIndex].winner !== null;
            const nextBoardHasWinCondition = boardsToAvoid.includes(move.squareIndex);
            if (nextBoardHasWinner || nextBoardHasWinCondition)
                return false;

            return true;
        });
    }

    protected getSafeWinBlockingMoves(boards: BoardState[], gameWinningMovesForHuman: BoardLocation[]): BoardLocation[] {
        const playableBoards = this.getPlayableBoards(boards);
        return gameWinningMovesForHuman.filter(move => {
            if (!playableBoards.includes(move.boardIndex))
                return false;

            const otherWinConditions = gameWinningMovesForHuman.filter(v => {
                return !(v.boardIndex === move.boardIndex && v.squareIndex === move.squareIndex);
            });
            const otherWinningBoards = otherWinConditions.map(v => v.boardIndex);
            const hasOtherWinConditions = otherWinConditions.length > 0;
            const nextBoardHasWinner = boards[move.squareIndex].winner !== null;
            const nextBoardHasWinCondition = otherWinningBoards.includes(move.squareIndex);
            if (hasOtherWinConditions && (nextBoardHasWinner || nextBoardHasWinCondition))
                return false;

            return true;
        });
    }

    protected getLineBuildingMoves(boards: BoardState[]): BoardLocation[] {
        const lineBuildingMoves: BoardLocation[] = [];

        const playableBoards = this.getPlayableBoards(boards);
        const markedPlayableBoards = playableBoards.filter(v => boards[v].squares.includes(this.botPlayer));

        for (const boardIndex of markedPlayableBoards) {
            const squares = boards[boardIndex].squares;
            const markedSquares = this.getSquaresMarkedForPlayer(squares, this.botPlayer);
            const lineBuildingSquares: Set<number> = new Set();
            for (const squareIndex of markedSquares) {
                const possibleLines = winStates.filter(v => v.includes(squareIndex));
                for (const line of possibleLines) {
                    const otherSquaresInLine = line.filter(v => v !== squareIndex);
                    if (otherSquaresInLine.every(v => !squares[v])) {
                        otherSquaresInLine.forEach(v => lineBuildingSquares.add(v));
                    }
                }
            }
            for (const squareIndex of lineBuildingSquares) {
                if (boardIndex !== squareIndex)
                    lineBuildingMoves.push({ boardIndex, squareIndex });
            }
        }

        return lineBuildingMoves;
    }

    protected getSquaresMarkedForPlayer(squares: string[], player: Player) {
        return squares.map((_, i) => i).filter(v => squares[v] === player);
    }
}
