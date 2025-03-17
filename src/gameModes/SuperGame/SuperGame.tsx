import * as React from "react";
import { useEffect, useState } from "react";
import SuperBoard from "~components/SuperBoard/SuperBoard";
import { checkForWinner } from "~helpers/gameHelper";
import { BoardState, Player } from "~types";

const SuperGame = () => {
    const [ player, setPlayer ] = useState<string>(Player.X);
    const [ boards, setBoards ] = useState<BoardState[]>(Array(9).fill({
        playable: true,
        squares: Array(9).fill(""),
        winner: null,
    }));
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

        const nextBoards1 = boards.map((board, i) => {
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

        const restrictPlayable = !nextBoards1[squareIndex].winner;

        const nextBoards2 = nextBoards1.map((board, i) => {
            return {
                ...board,
                playable: !board.winner && (!restrictPlayable || squareIndex === i),
            };
        });

        setBoards(nextBoards2);

        const nextPlayer = player == Player.X ? Player.O : Player.X;
        setPlayer(nextPlayer);

        const winners = nextBoards2.map(board => board.winner);
        const w = checkForWinner(winners);
        setWinner(w);
    };

    const superBoardProps = { boards, handleClick };

    return (
        <div className="super-game">
            <SuperBoard {...superBoardProps} />
        </div>
    );
};

export default SuperGame;
