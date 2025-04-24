import { adjacentSquares } from "~constants";
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
        const winningMoves = gameWinningMovesForBot.filter(move => playableBoards.includes(move.boardIndex));
        if (winningMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * winningMoves.length);
            return winningMoves[randomIndex];
        }

        // Block human win if possible (unless it would leave another win condition open)
        const gameWinningMovesForHuman = this.getWinningMovesForGame(this.humanPlayer, boards);
        const gameWinningBoardsForHuman = gameWinningMovesForHuman.map(v => v.boardIndex);
        const anyWinConditions = gameWinningMovesForHuman.length > 0;

        const winBlockingMoves = gameWinningMovesForHuman.filter(move => {
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

        if (winBlockingMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * winBlockingMoves.length);
            return winBlockingMoves[randomIndex];
        }

        // Win board if possible (unless it would leave a win condition open)
        const boardWinningMovesForBot = this.getWinningMovesForBoard(this.botPlayer, boards);

        const boardWinningMoves = boardWinningMovesForBot.filter(move => {
            const nextBoardHasWinner = boards[move.squareIndex].winner !== null;
            const nextBoardHasWinCondition = gameWinningBoardsForHuman.includes(move.squareIndex);
            if (anyWinConditions && (nextBoardHasWinner || nextBoardHasWinCondition))
                return false;

            return true;
        });

        if (boardWinningMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * boardWinningMoves.length);
            return boardWinningMoves[randomIndex];
        }

        // Block human from winning board if possible (unless it would leave a win condition open)
        const boardWinningMovesForHuman = this.getWinningMovesForBoard(this.humanPlayer, boards);

        const boardWinBlockingMoves = boardWinningMovesForHuman.filter(move => {
            const nextBoardHasWinner = boards[move.squareIndex].winner !== null;
            const nextBoardHasWinCondition = gameWinningBoardsForHuman.includes(move.squareIndex);
            if (anyWinConditions && (nextBoardHasWinner || nextBoardHasWinCondition))
                return false;

            return true;
        });

        if (boardWinBlockingMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * boardWinBlockingMoves.length);
            return boardWinBlockingMoves[randomIndex];
        }

        // Start building a line if possible
        const markedPlayableBoards = playableBoards.filter(v => boards[v].squares.includes(this.botPlayer));
        const lineBuildingMoves: BoardLocation[] = [];
        for (const boardIndex of markedPlayableBoards) {
            const squares = boards[boardIndex].squares;
            const markedSquares = this.getSquaresMarkedForPlayer(squares, this.botPlayer);
            const playableSquares = this.getPlayableSquares(squares);
            const adjacents: Set<number> = new Set();
            for (const squareIndex of markedSquares) {
                adjacentSquares[squareIndex].forEach(v => {
                    if (playableSquares.includes(v))
                        adjacents.add(v);
                });
            }
            for (const squareIndex of adjacents) {
                lineBuildingMoves.push({ boardIndex, squareIndex });
            }
        }

        const safeLineBuildingMoves = lineBuildingMoves.filter(move => {
            const nextBoardHasWinner = boards[move.squareIndex].winner !== null;
            const nextBoardHasWinCondition = gameWinningBoardsForHuman.includes(move.squareIndex);
            if (anyWinConditions && (nextBoardHasWinner || nextBoardHasWinCondition))
                return false;

            return true;
        });

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

            const safePlayableMoves = playableMoves.filter(move => {
                const nextBoardHasWinner = boards[move.squareIndex].winner !== null;
                const nextBoardHasWinCondition = gameWinningBoardsForHuman.includes(move.squareIndex);
                if (anyWinConditions && (nextBoardHasWinner || nextBoardHasWinCondition)) 
                    return false;

                return true;
            });

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
