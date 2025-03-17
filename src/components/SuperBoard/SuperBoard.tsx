import * as React from "react";
import { useState } from "react";
import Board from "~components/Board/Board";
import { checkForWinner } from "~helpers/gameHelper";
import { BoardState, Player } from "~types";
import "./SuperBoard.css";

const SuperBoard = () => {
    const [ player, setPlayer ] = useState<string>(Player.X);
    const [ boards, setBoards ] = useState<BoardState[]>(Array(9).fill({ squares: Array(9).fill(""), winner: null }));
    const [ squares, setSquares ] = useState<string[]>(Array(9).fill(""));
    const [ winner, setWinner ] = useState<string | null>(null);

    const handleClick = (i: number) => {
        if (squares[i])
            return;

        const nextSquares = squares.slice();
        nextSquares[i] = player;
        setSquares(nextSquares);

        const nextPlayer = player == Player.X ? Player.O : Player.X;
        setPlayer(nextPlayer);

        setWinner(checkForWinner(nextSquares));
    };

    return (
        <div className="super-board">
            {boards.map((board, i) => {
                const key = `board-${i}`;
                const boardProps = { boardIndex: i, squares, winner, handleClick };
                return (
                    <Board key={key} {...boardProps} />
                );
            })}
        </div>
    );
};

export default SuperBoard;
