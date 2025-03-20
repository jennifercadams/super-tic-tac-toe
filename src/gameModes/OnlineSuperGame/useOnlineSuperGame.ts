import { useEffect, useState } from "react";
import { processMove } from "~helpers/gameHelper";
import { BoardState, Move } from "~types";
import { OnlineSuperGameProps } from "./OnlineSuperGame";

const useOnlineSuperGame = (props: OnlineSuperGameProps) => {
    const [ currentMove, setCurrentMove ] = useState<number>(0);
    const [ boards, setBoards ] = useState<BoardState[]>(Array(9).fill({
        playable: true,
        squares: Array(9).fill(""),
        winner: null,
    }));
    const [ status, setStatus ] = useState<string>("Player Turn: X");
    const [ winner, setWinner ] = useState<string | null>(null);

    const { socketService, localPlayer } = props;

    useEffect(() => {
        const handleOnMove = (e: Event) => onMove((e as CustomEvent).detail);
        document.addEventListener("onMove", handleOnMove);

        return () => {
            window.removeEventListener("onMove", handleOnMove);
        };
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

        socketService.sendMove({currentMove, boardIndex, squareIndex, boards });
    };

    const onMove = (move: Move) => {
        const moveResult = processMove(move);
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
        setStatus("Player Turn: X");
        setWinner(null);
    };

    return {
        boards,
        status,
        winner,
        handleClick,
        handleRestart,
    };
};

export default useOnlineSuperGame;
