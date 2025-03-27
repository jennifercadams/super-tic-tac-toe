import * as React from "react";
import Square, { SquareProps } from "~components/Square/Square";
import { Move, Winner } from "~types";
import "./Board.css";

export type BoardProps = {
    boardIndex: number;
    playable: boolean;
    squares: string[];
    winner: string | null;
    lastMove: (Move | null);
    handleClick: (arg1: number, arg2: number) => void;
};

const Board = (props: BoardProps) => {
    const { boardIndex, playable, squares, winner, lastMove, handleClick } = props;

    const boardHasLastMove = boardIndex === lastMove?.boardIndex;

    return (
        <div className="board">
            {!winner && squares.map((square, squareIndex) => {
                const key = `square-${boardIndex}-${squareIndex}`;
                const isLastMove = boardHasLastMove && squareIndex == lastMove?.squareIndex;
                const squareProps: SquareProps = {
                    playable,
                    value: square,
                    isLastMove,
                    onSquareClick: () => handleClick(squareIndex, boardIndex),
                };
                return (
                    <Square key={key} {...squareProps} />
                );
            })}
            {winner && winner !== Winner.Draw && <div className={`winner${boardHasLastMove ? " last-move" : ""}`}>
                <svg viewBox="0 0 20 20">
                    <text x="50%" y="50%">{winner}</text>
                </svg>
            </div>}
            {winner && winner === Winner.Draw && <div className={`draw${boardHasLastMove ? " last-move" : ""}`}>
                <svg viewBox="0 0 64 32">
                    <text x="50%" y="50%">{winner}</text>
                </svg>
            </div>}
        </div>
    );
};

export default Board;
