import * as React from "react";
import { useState } from "react";
import Square from "~components/Square/Square";
import "./Board.css";

const Board = () => {
    const [ squares, setSquares ] = useState<string[]>(Array(9).fill(""));

    return (
        <div className="board">
            {squares.map((square, i) => {
                return (
                    <Square key={i} value={square} />
                );
            })}
        </div>
    );
};

export default Board;
