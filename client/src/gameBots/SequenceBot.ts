import { BoardLocation, BoardState, Player } from "~types";
import { Bot } from "./Bot";

export class SequenceBot extends Bot {
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
        const playableWinningMoves = gameWinningMovesForBot.filter(move => playableBoards.includes(move.boardIndex));
        if (playableWinningMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * playableWinningMoves.length);
            return playableWinningMoves[randomIndex];
        }

        // Block human win if possible (unless it would leave another win condition open)
        const gameWinningMovesForHuman = this.getWinningMovesForGame(this.humanPlayer, boards);
        const gameWinningBoardsForHuman = gameWinningMovesForHuman.map(v => v.boardIndex);
        const anyWinConditions = gameWinningMovesForHuman.length > 0;

        const blockWinWithBoardWinMoves = this.getWinningMoves(this.botPlayer, boards, gameWinningBoardsForHuman);
        const safeBlockWinWithBoardWinMoves = this.getSafeWinBlockingMoves(boards, blockWinWithBoardWinMoves)
            .filter(move => move.boardIndex !== move.squareIndex);

        if (safeBlockWinWithBoardWinMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * safeBlockWinWithBoardWinMoves.length);
            return safeBlockWinWithBoardWinMoves[randomIndex];
        }

        const safeWinBlockingMoves = this.getSafeWinBlockingMoves(boards, gameWinningMovesForHuman);

        if (safeWinBlockingMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * safeWinBlockingMoves.length);
            return safeWinBlockingMoves[randomIndex];
        }

        // Win board if possible (unless it would leave a win condition open)
        const boardWinningMovesForBot = this.getWinningMovesForBoard(this.botPlayer, boards);
        const safeBoardWinningMoves = this.getSafeMoves(boards, boardWinningMovesForBot, gameWinningBoardsForHuman);

        if (safeBoardWinningMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * safeBoardWinningMoves.length);
            return safeBoardWinningMoves[randomIndex];
        }

        // Block human from winning board if possible (unless it would leave a win condition open)
        const boardWinningMovesForHuman = this.getWinningMovesForBoard(this.humanPlayer, boards);
        const safeBoardWinBlockingMoves = this.getSafeMoves(boards, boardWinningMovesForHuman, gameWinningBoardsForHuman);

        if (safeBoardWinBlockingMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * safeBoardWinBlockingMoves.length);
            return safeBoardWinBlockingMoves[randomIndex];
        }

        // Start building a line if possible
        const lineBuildingMoves = this.getLineBuildingMoves(boards);
        const safeLineBuildingMoves = this.getSafeMoves(boards, lineBuildingMoves, gameWinningBoardsForHuman);

        if (safeLineBuildingMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * safeLineBuildingMoves.length);
            return safeLineBuildingMoves[randomIndex];
        }

        // If there are win conditions, try to find a safe move
        if (anyWinConditions) {
            const playableMoves: BoardLocation[] = [];
            for (const boardIndex of playableBoards) {
                const playableSquares = this.getPlayableSquares(boards[boardIndex].squares);
                for (const squareIndex of playableSquares) {
                    playableMoves.push({ boardIndex, squareIndex });
                }
            }

            const safePlayableMoves = this.getSafeMoves(boards, playableMoves, gameWinningBoardsForHuman);

            if (safePlayableMoves.length > 0) {
                const randomIndex = Math.floor(Math.random() * safePlayableMoves.length);
                return safePlayableMoves[randomIndex];
            }
        }

        // Play random move
        const boardIndex = this.getRandomBoardIndex(boards);
        const squareIndex = this.getRandomSquareIndex(boards[boardIndex].squares);

        return { boardIndex, squareIndex };
    }
}
