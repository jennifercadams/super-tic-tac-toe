import { useEffect, useMemo, useState } from "react";
import { RandomBot } from "~gameBots/RandomBot";
import { processMove } from "~helpers/gameHelper";
import { BoardState, Move, MoveResult, Player } from "~types";

const useBotSuperGame = (player: Player) => {
    const bot = useMemo(() => new RandomBot(), []);
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
            const botMove = bot.getFirstMove(boards);
            const botMoveResult = processMove(botMove, null);
            setLastMove(botMove);
            updateGameState(botMoveResult);
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
            setLastMove(move);
            updateGameState(playerMoveResult);
            return;
        }

        const botMove = bot.getNextMove(playerMoveResult.nextMove, playerMoveResult.nextBoards);
        const botMoveResult = processMove(botMove, null);

        setLastMove(botMove);
        updateGameState(botMoveResult);
    };

    const updateGameState = (moveResult: MoveResult) => {
        setCurrentMove(moveResult.nextMove);
        setBoards(moveResult.nextBoards);
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
