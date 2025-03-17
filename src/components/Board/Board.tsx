import * as React from "react";
import Square from "~components/Square/Square";
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
            {winner && <div className="winner">{winner}</div>}
            {!winner && squares.map((square, i) => {
                const key = `square-${boardIndex}-${i}`;
                return (
                    <Square key={key} value={square} onSquareClick={() => handleClick(i)} />
                );
            })}
        </div>
    );
};

export default Board;
