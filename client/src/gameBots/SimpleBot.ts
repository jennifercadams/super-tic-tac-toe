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
        const winningMovesForBot = this.getWinningMovesForGame(this.botPlayer, boards);

        for (const move of winningMovesForBot) {
            if (playableBoards.includes(move.boardIndex))
                return move;
        }

        const winningMovesForHuman = this.getWinningMovesForGame(this.humanPlayer, boards);
        const winningBoardsForHuman = winningMovesForHuman.map(v => v.boardIndex);

        for (const move of winningMovesForHuman) {
            const multipleWinConditions = winningMovesForHuman.length > 1;
            const nextBoardHasWinner = boards[move.squareIndex].winner !== null;
            const nextBoardHasWinCondition = winningBoardsForHuman.includes(move.squareIndex);
            if (multipleWinConditions && (nextBoardHasWinner || nextBoardHasWinCondition)) {
                continue;
            }
            if (playableBoards.includes(move.boardIndex)) {
                return move;
            }
        }

        const boardIndex = this.getRandomBoardIndex(boards);
        const squareIndex = this.getRandomSquareIndex(boards[boardIndex].squares);

        return { boardIndex, squareIndex };
    }
}
