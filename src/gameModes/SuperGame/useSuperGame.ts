import { useEffect, useState } from "react";
import { checkForWinner } from "~helpers/gameHelper";
import { BoardState, Player, Winner } from "~types";

const useSuperGame = () => {
    const [ player, setPlayer ] = useState<string>(Player.X);
    const [ boards, setBoards ] = useState<BoardState[]>(Array(9).fill({
        playable: true,
        squares: Array(9).fill(""),
        winner: null,
    }));
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

        const updatedBoards = updateBoards(squareIndex, boardIndex);
        const nextBoards = setPlayableSquares(updatedBoards, squareIndex);
        setBoards(nextBoards);

        const nextPlayer = player == Player.X ? Player.O : Player.X;
        setPlayer(nextPlayer);

        const winners = nextBoards.map(board => board.winner);
        const nextWinner = checkForWinner(winners);
        updateStatus(nextWinner, nextPlayer);
        setWinner(nextWinner);
    };

    const updateBoards = (squareIndex: number, boardIndex: number): BoardState[] => {
        return boards.map((board, i) => {
            if (boardIndex === i)
            {
                const nextSquares = boards[boardIndex].squares.slice();
                nextSquares[squareIndex] = player;
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
        setPlayer(Player.X);
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

export default useSuperGame;
