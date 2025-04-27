import { BoardLocation, BoardState, Player } from "~types";
import { Bot } from "./Bot";

export class SequenceBot extends Bot {
    private emptyBoards: number[] = [];
    private possibleWinningBoardsForBot: number[] = [];
    private possibleWinningBoardsForHuman: number[] = [];
    private winnableBoardsForBot: number[] = [];
    private winnableBoardsForHuman: number[] = [];
    private wonBoards: number[] = [];

    constructor(humanPlayer: Player) {
        super(humanPlayer);
    }

    public getFirstMove(): BoardLocation {
        return this.getRandomFirstMove();
    }

    public getNextMove(boards: BoardState[]): BoardLocation {
        const playableBoards = this.getPlayableBoards(boards);
        const allBoardWinningMovesForBot = this.getWinningMovesForAllBoards(this.botPlayer, boards);
        const allBoardWinningMovesForHuman = this.getWinningMovesForAllBoards(this.humanPlayer, boards);

        this.emptyBoards = this.getEmptyBoards(boards);
        this.possibleWinningBoardsForBot = this.getPossibleWinningBoardsForGame(this.botPlayer, boards);
        this.possibleWinningBoardsForHuman = this.getPossibleWinningBoardsForGame(this.humanPlayer, boards);
        this.winnableBoardsForBot = allBoardWinningMovesForBot.map(v => v.boardIndex);
        this.winnableBoardsForHuman = allBoardWinningMovesForHuman.map(v => v.boardIndex);
        this.wonBoards = boards.map((_, i) => i).filter(v => boards[v].winner);

        // Play winning move if possible
        const gameWinningMovesForBot = this.getWinningMovesForGame(this.botPlayer, boards);
        const playableWinningMoves = gameWinningMovesForBot.filter(move => playableBoards.includes(move.boardIndex));
        if (playableWinningMoves.length > 0) 
            return this.getRandomMoveFromMoveSet(playableWinningMoves);

        // Block human win if possible (unless it would leave another win condition open)
        const gameWinningMovesForHuman = this.getWinningMovesForGame(this.humanPlayer, boards);
        const gameWinningBoardsForHuman = gameWinningMovesForHuman.map(v => v.boardIndex);

        const blockWinWithWinMoves = this.getWinningMoves(this.botPlayer, boards, gameWinningBoardsForHuman);
        const safeBlockWinWithWinMoves = this.getSafeWinBlockingMoves(boards, blockWinWithWinMoves, gameWinningMovesForHuman)
            .filter(move => move.boardIndex !== move.squareIndex);

        if (safeBlockWinWithWinMoves.length > 0)
            return this.getRandomMoveFromMoveSet(safeBlockWinWithWinMoves);

        const safeWinBlockingMoves = this.getSafeWinBlockingMoves(boards, gameWinningMovesForHuman, gameWinningMovesForHuman);

        if (safeWinBlockingMoves.length > 0)
            return this.getRandomMoveFromMoveSet(safeWinBlockingMoves);

        // Play in possible winning board if possible
        const lineBuildingMoves = this.getLineBuildingMoves(boards);
        const safeLineBuildingMoves = this.getSafeMoves(boards, lineBuildingMoves, gameWinningBoardsForHuman);
        const winningBoardLineBuildingMoves = this.getPossibleWinningBoardMoves(safeLineBuildingMoves);
        const priorityWinningBoardLineBuildingMoves = this.prioritizeMoves(winningBoardLineBuildingMoves);

        if (priorityWinningBoardLineBuildingMoves.length > 0)
            return this.getRandomMoveFromMoveSet(priorityWinningBoardLineBuildingMoves);

        if (winningBoardLineBuildingMoves.length > 0)
            return this.getRandomMoveFromMoveSet(winningBoardLineBuildingMoves);

        const playableMoves = this.getPlayableMoves(boards);
        const safePlayableMoves = this.getSafeMoves(boards, playableMoves, gameWinningBoardsForHuman);
        const winningBoardMoves = this.getPossibleWinningBoardMoves(safePlayableMoves);
        const priorityWinningBoardMoves = this.prioritizeMoves(winningBoardMoves);

        if (priorityWinningBoardMoves.length > 0)
            return this.getRandomMoveFromMoveSet(priorityWinningBoardMoves);

        if (winningBoardMoves.length > 0)
            return this.getRandomMoveFromMoveSet(winningBoardMoves);

        // Win board if possible (unless it would leave a win condition open)
        const boardWinningMovesForBot = this.getWinningMovesForPlayableBoards(this.botPlayer, boards);
        const safeBoardWinningMoves = this.getSafeMoves(boards, boardWinningMovesForBot, gameWinningBoardsForHuman);

        if (safeBoardWinningMoves.length > 0)
            return this.getRandomMoveFromMoveSet(safeBoardWinningMoves);

        // Block human from winning board if possible (unless it would leave a win condition open)
        const boardWinningMovesForHuman = this.getWinningMovesForPlayableBoards(this.humanPlayer, boards);
        const safeBoardWinBlockingMoves = this.getSafeMoves(boards, boardWinningMovesForHuman, gameWinningBoardsForHuman);

        if (safeBoardWinBlockingMoves.length > 0)
            return this.getRandomMoveFromMoveSet(safeBoardWinBlockingMoves);

        // Start building a line if possible
        const priorityLineBuildingMoves = this.prioritizeMoves(safeLineBuildingMoves);

        if (priorityLineBuildingMoves.length > 0)
            return this.getRandomMoveFromMoveSet(priorityLineBuildingMoves);

        if (safeLineBuildingMoves.length > 0)
            return this.getRandomMoveFromMoveSet(safeLineBuildingMoves);

        // Play a random move
        const priorityPlayableMoves = this.prioritizeMoves(safePlayableMoves);

        if (priorityPlayableMoves.length > 0)
            return this.getRandomMoveFromMoveSet(priorityPlayableMoves);

        if (safePlayableMoves.length > 0)
            return this.getRandomMoveFromMoveSet(safePlayableMoves);

        return this.getRandomMoveFromMoveSet(playableMoves);
    }

    private getPossibleWinningBoardMoves(moveSet: BoardLocation[]): BoardLocation[] {
        return moveSet.filter(move => this.possibleWinningBoardsForBot.includes(move.boardIndex));
    }

    private prioritizeMoves(moveSet: BoardLocation[]): BoardLocation[] {
        const toEmpty = moveSet.filter(move => {
            return move.boardIndex !== move.squareIndex && this.emptyBoards.includes(move.squareIndex);
        });
        const toEmptyAvoidCenter = toEmpty.filter(move => move.squareIndex !== 4);
        if (toEmptyAvoidCenter.length > 0)
            return toEmptyAvoidCenter;
        if (toEmpty.length > 0)
            return toEmpty;

        const priorityMoves = moveSet.filter(move => {
            const toWinnableBoard = this.winnableBoardsForBot.includes(move.squareIndex) || 
                this.winnableBoardsForHuman.includes(move.squareIndex);
            const toPossibleWin = this.possibleWinningBoardsForBot.includes(move.squareIndex) || 
                this.possibleWinningBoardsForHuman.includes(move.squareIndex);
            const toWon = this.wonBoards.includes(move.squareIndex);

            return !toWinnableBoard && !toPossibleWin && !toWon;
        });

        const priorityMovesAvoidCenter = priorityMoves.filter(move => move.squareIndex !== 4);
        if (priorityMovesAvoidCenter.length > 0)
            return priorityMovesAvoidCenter;
        if (priorityMoves.length > 0)
            return priorityMoves;

        const anyWinnable = this.winnableBoardsForBot.length > 0 || this.winnableBoardsForHuman.length > 0;

        const avoidWinnable = moveSet.filter(move => {
            const toWinnableBoard = this.winnableBoardsForBot.includes(move.squareIndex) || 
                this.winnableBoardsForHuman.includes(move.squareIndex);
            const toWon = this.wonBoards.includes(move.squareIndex);

            if (toWinnableBoard || (anyWinnable && toWon)) {
                return false;
            }

            return true;
        });

        const avoidWinnableAvoidCenter = avoidWinnable.filter(move => move.squareIndex !== 4);
        if (avoidWinnableAvoidCenter.length > 0)
            return avoidWinnableAvoidCenter;
        if (avoidWinnable.length > 0)
            return avoidWinnable;

        const moveSetAvoidCenter = moveSet.filter(move => move.squareIndex !== 4);
        if (moveSetAvoidCenter.length > 0)
            return moveSetAvoidCenter;
        else
            return moveSet;
    }
}
