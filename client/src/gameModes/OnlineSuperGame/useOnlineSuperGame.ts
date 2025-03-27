import { useCallback, useEffect, useState } from "react";
import { processMove } from "~helpers/gameHelper";
import { BoardState, Move, Player } from "~types";
import { OnlineSuperGameProps } from "./OnlineSuperGame";

const useOnlineSuperGame = (props: OnlineSuperGameProps) => {
    const [ currentMove, setCurrentMove ] = useState<number>(0);
    const [ boards, setBoards ] = useState<BoardState[]>(Array(9).fill({
        playable: false,
        squares: Array(9).fill(""),
        winner: null,
    }));
    const [ winner, setWinner ] = useState<string | null>(null);

    const {
        socketService,
        roomCode,
        localPlayer,
        localReconnected,
        setLocalReconnected,
        isRemoteUserConnected,
        lastMove,
        setLastMove,
        setStatus,
    } = props;

    const onMove = useCallback((move: Move) => {
        setLastMove(move);
        const moveResult = processMove(move, localPlayer);
        setCurrentMove(moveResult.nextMove);
        setBoards(moveResult.nextBoards);
        setStatus(moveResult.nextStatus);
        setWinner(moveResult.nextWinner);
    }, [currentMove, localPlayer]);

    useEffect(() => {
        const handleOnMove = (e: Event) => onMove((e as CustomEvent).detail);
        document.addEventListener("onMove", handleOnMove);

        return () => {
            document.removeEventListener("onMove", handleOnMove);
        };
    }, [onMove]);

    useEffect(() => {
        if (localPlayer === Player.X && currentMove === 0 && isRemoteUserConnected) {
            const nextBoards = boards.map(board => {
                return { ...board, playable: true };
            });
            setBoards(nextBoards);
        }
    }, [isRemoteUserConnected]);

    useEffect(() => {
        if (!winner)
            return;

        const nextBoards = boards.map(board => {
            return { ...board, playable: false };
        });
        setBoards(nextBoards);
    }, [winner]);

    useEffect(() => {
        if (!roomCode) {
            setCurrentMove(0);
            setBoards(Array(9).fill({
                playable: false,
                squares: Array(9).fill(""),
                winner: null,
            }));
            setWinner(null);
        }
    }, [roomCode]);

    useEffect(() => {
        if (localReconnected && lastMove) {
            onMove(lastMove);
            setLocalReconnected(false);
        }
    }, [localReconnected]);

    const handleClick = (squareIndex: number, boardIndex: number) => {
        if (boards[boardIndex].squares[squareIndex])
            return;

        socketService.sendMove({currentMove, boardIndex, squareIndex, boards });
    };

    return {
        boards,
        handleClick,
    };
};

export default useOnlineSuperGame;
