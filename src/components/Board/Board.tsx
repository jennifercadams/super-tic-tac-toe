import * as React from "react";
import Square from "~components/Square/Square";
import "./Board.css";

export type BoardProps = {
    winner: string | null;
    squares: string[];
    handleClick: (arg: number) => void;
};

const Board = (props: BoardProps) => {
    const { winner, squares, handleClick } = props;

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
