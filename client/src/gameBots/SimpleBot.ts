import { BoardLocation, BoardState, Player } from "~types";
import { Bot } from "./Bot";

export class SimpleBot extends Bot {
    constructor(humanPlayer: Player) {
        super(humanPlayer);
    }

    public getFirstMove(): BoardLocation {
        return this.getRandomFirstMove();
    }

    public getNextMove(boards: BoardState[]): BoardLocation {
        const playableBoards = this.getPlayableBoards(boards);

        // Play winning move if possible
        const gameWinningMovesForBot = this.getWinningMovesForGame(this.botPlayer, boards);
        const winningMoves = gameWinningMovesForBot.filter(move => playableBoards.includes(move.boardIndex));
        if (winningMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * winningMoves.length);
            return winningMoves[randomIndex];
        }

        // Block human win if possible (unless it would leave another win condition open)
        const gameWinningMovesForHuman = this.getWinningMovesForGame(this.humanPlayer, boards);
        const gameWinningBoardsForHuman = gameWinningMovesForHuman.map(v => v.boardIndex);
        const multipleWinConditions = gameWinningMovesForHuman.length > 1;

        const winBlockingMoves = gameWinningMovesForHuman.filter(move => {
            if (!playableBoards.includes(move.boardIndex))
                return false;

            const nextBoardHasWinner = boards[move.squareIndex].winner !== null;
            const nextBoardHasWinCondition = gameWinningBoardsForHuman.includes(move.squareIndex);
            if (multipleWinConditions && (nextBoardHasWinner || nextBoardHasWinCondition))
                return false;

            return true;
        });

        if (winBlockingMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * winBlockingMoves.length);
            return winBlockingMoves[randomIndex];
        }

        const boardIndex = this.getRandomBoardIndex(boards);
        const squareIndex = this.getRandomSquareIndex(boards[boardIndex].squares);

        return { boardIndex, squareIndex };
    }
}
