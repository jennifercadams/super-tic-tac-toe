import { useEffect, useMemo, useState } from "react";
import { checkForWinner } from "~helpers/gameHelper";
import { SocketService } from "~services/SocketService";
import { BoardState, Move, Player, Winner } from "~types";

const useOnlineSuperGame = () => {
    const [ currentMove, setCurrentMove ] = useState<number>(0);
    const [ boards, setBoards ] = useState<BoardState[]>(Array(9).fill({
        playable: true,
        squares: Array(9).fill(""),
        winner: null,
    }));
    const [ status, setStatus ] = useState<string>("Player Turn: X");
    const [ winner, setWinner ] = useState<string | null>(null);

    const onProcessMove = (move: Move) => {
        const updatedBoards = updateBoards(move);
        const nextBoards = setPlayableSquares(updatedBoards, move.squareIndex);
        setBoards(nextBoards);

        const nextMove = move.currentMove + 1;
        setCurrentMove(nextMove);

        const winners = nextBoards.map(board => board.winner);
        const nextWinner = checkForWinner(winners);
        const nextPlayer = getPlayer(nextMove);
        updateStatus(nextWinner, nextPlayer);
        setWinner(nextWinner);
    };

    const socketService = useMemo(() => new SocketService(onProcessMove), []);

    const getPlayer = (move: number) => {
        return move % 2 === 0 ? Player.X : Player.O;
    };

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

    const updateBoards = (move: Move): BoardState[] => {
        return move.boards.map((board, i) => {
            if (move.boardIndex === i)
            {
                const nextSquares = move.boards[move.boardIndex].squares.slice();
                nextSquares[move.squareIndex] = getPlayer(move.currentMove);
                return {
                    ...board,
                    squares: nextSquares,
                    winner: checkForWinner(nextSquares),
                };
            }
            else
            {
                return {
                    ...board,
                    squares: board.squares.slice(),
                };
            }
        });
    };

    const setPlayableSquares = (boards: BoardState[], squareIndex: number): BoardState[] => {
        const restrictPlayable = !boards[squareIndex].winner;

        return boards.map((board, i) => {
            return {
                ...board,
                playable: !board.winner && (!restrictPlayable || squareIndex === i),
            };
        });
    };

    const updateStatus = (nextWinner: (string | null), nextPlayer: Player) => {
        if (!nextWinner) {
            setStatus(`Player Turn: ${nextPlayer}`);
        }
        else if (nextWinner === Winner.Draw) {
            setStatus("Draw");
        }
        else {
            setStatus(`Winner: ${nextWinner}`);
        }
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
