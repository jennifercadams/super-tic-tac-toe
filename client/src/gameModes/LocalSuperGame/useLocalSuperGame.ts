import { useEffect, useState } from "react";
import { processMove } from "~helpers/gameHelper";
import { BoardState, Move } from "~types";

const useSuperGame = () => {
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

        const move: Move = {currentMove, boardIndex, squareIndex, boards };
        setLastMove(move);

        const moveResult = processMove(move, null);
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

export default useSuperGame;
