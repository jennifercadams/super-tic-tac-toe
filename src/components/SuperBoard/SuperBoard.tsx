import * as React from "react";
import { useState } from "react";
import Board from "~components/Board/Board";
import { checkForWinner } from "~helpers/gameHelper";
import { BoardState, Player } from "~types";
import "./SuperBoard.css";

const SuperBoard = () => {
    const [ player, setPlayer ] = useState<string>(Player.X);
    const [ boards, setBoards ] = useState<BoardState[]>(Array(9).fill({
        playable: true,
        squares: Array(9).fill(""),
        winner: null,
    }));

    const handleClick = (squareIndex: number, boardIndex: number) => {
        if (boards[boardIndex].squares[squareIndex])
            return;

        const restrictPlayable = !boards[squareIndex].winner;

        const nextBoards = boards.map((board, i) => {
            if (boardIndex === i)
            {
                const nextSquares = boards[boardIndex].squares.slice();
                nextSquares[squareIndex] = player;
                return {
                    playable: !restrictPlayable || (squareIndex === i && !board.winner),
                    squares: nextSquares,
                    winner: checkForWinner(nextSquares),
                };
            }
            else
            {
                return {
                    ...board,
                    playable: !restrictPlayable || (squareIndex === i && !board.winner),
                    squares: board.squares.slice(),
                };
            }
        });

        setBoards(nextBoards);

        const nextPlayer = player == Player.X ? Player.O : Player.X;
        setPlayer(nextPlayer);
    };

    return (
        <div className="super-board">
            {boards.map((board, boardIndex) => {
                const key = `board-${boardIndex}`;
                const boardProps = { boardIndex, ...board, handleClick };
                return (
                    <Board key={key} {...boardProps} />
                );
            })}
        </div>
    );
};

export default SuperBoard;
