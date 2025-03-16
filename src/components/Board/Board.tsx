import * as React from "react";
import { useState } from "react";
import Square from "~components/Square/Square";
import { checkForWinner } from "~helpers/gameHelper";
import "./Board.css";

export enum Player {
    X = "X",
    O = "O"
}

const Board = () => {
    const [ player, setPlayer ] = useState<string>(Player.X);
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
        <div className="board">
            {winner && <div className="winner">{winner}</div>}
            {!winner && squares.map((square, i) => {
                return (
                    <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
                );
            })}
        </div>
    );
};

export default Board;
