import * as React from "react";
import Square from "~components/Square/Square";
import { Winner } from "~types";
import "./Board.css";

export type BoardProps = {
    boardIndex: number;
    squares: string[];
    winner: string | null;
    handleClick: (arg: number) => void;
};

const Board = (props: BoardProps) => {
    const { boardIndex, squares, winner, handleClick } = props;

    return (
        <div className="board">
            {!winner && squares.map((square, i) => {
                const key = `square-${boardIndex}-${i}`;
                return (
                    <Square key={key} value={square} onSquareClick={() => handleClick(i)} />
                );
            })}
            {winner && winner !== Winner.Draw && <div className="winner">{winner}</div>}
            {winner && winner === Winner.Draw && <div className="draw">{winner}</div>}
        </div>
    );
};

export default Board;
