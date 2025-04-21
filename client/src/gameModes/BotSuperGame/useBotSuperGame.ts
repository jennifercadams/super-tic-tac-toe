import { useEffect, useMemo, useState } from "react";
import { RandomBot } from "~gameBots/RandomBot";
import { processMove } from "~helpers/gameHelper";
import { BoardState, Move, MoveResult, Player } from "~types";

const useBotSuperGame = (player: Player) => {
    const bot = useMemo(() => new RandomBot(player), []);
    const [ currentMove, setCurrentMove ] = useState<number>(0);
    const [ boards, setBoards ] = useState<BoardState[]>(Array(9).fill({
        playable: true,
        squares: Array(9).fill(""),
        winner: null,
    }));
    const [ lastMove, setLastMove ] = useState<Move | null>(null);
    const [ status, setStatus ] = useState<string>("Player Turn: X");
    const [ winner, setWinner ] = useState<string | null>(null);

    useEffect(() => {
        if (currentMove === 0 && player === Player.O) {
            const { boardIndex, squareIndex } = bot.getFirstMove();
            const botMove: Move = { currentMove, boardIndex, squareIndex, boards};
            const botMoveResult = processMove(botMove, null);
            updateGameState(botMove, botMoveResult);
        }
    }, []);

    useEffect(() => {
        if (!winner)
            return;

        const nextBoards = boards.map(board => {
            return { ...board, playable: false };
        });
        setBoards(nextBoards);
    }, [winner]);

    const handleClick = (squareIndex: number, boardIndex: number) => {
        if (boards[boardIndex].squares[squareIndex])
            return;

        const move: Move = { currentMove, boardIndex, squareIndex, boards };
        const playerMoveResult = processMove(move, null);

        if (playerMoveResult.nextWinner) {
            updateGameState(move, playerMoveResult);
            return;
        }

        const botMoveLocation = bot.getNextMove(playerMoveResult.nextBoards);
        const botMove: Move = {
            currentMove: playerMoveResult.nextMove,
            boardIndex: botMoveLocation.boardIndex,
            squareIndex: botMoveLocation.squareIndex,
            boards: playerMoveResult.nextBoards,
        };
        const botMoveResult = processMove(botMove, null);
        updateGameState(botMove, botMoveResult);
    };

    const updateGameState = (move: Move, moveResult: MoveResult) => {
        setCurrentMove(moveResult.nextMove);
        setBoards(moveResult.nextBoards);
        setLastMove(move);
        setStatus(moveResult.nextStatus);
        setWinner(moveResult.nextWinner);
    };

    const handleRestart = () => {
        setCurrentMove(0);
        setBoards(Array(9).fill({
            playable: true,
            squares: Array(9).fill(""),
            winner: null,
        }));
        setLastMove(null);
        setStatus("Player Turn: X");
        setWinner(null);
    };

    return {
        boards,
        lastMove,
        status,
        winner,
        handleClick,
        handleRestart,
    };
};

export default useBotSuperGame;
