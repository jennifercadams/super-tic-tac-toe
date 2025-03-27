import * as React from "react";
import Board, { BoardProps } from "~components/Board/Board";
import { BoardState, Move } from "~types";
import "./SuperBoard.css";

export type SuperBoardProps = {
    boards: BoardState[];
    lastMove: (Move | null);
    handleClick: (arg1: number, arg2: number) => void;
};

const SuperBoard = (props: SuperBoardProps) => {
    const { boards, lastMove, handleClick } = props;

    return (
        <div className="super-board">
            {boards.map((board, boardIndex) => {
                const key = `board-${boardIndex}`;
                const boardProps: BoardProps = { boardIndex, ...board, lastMove, handleClick };
                return (
                    <Board key={key} {...boardProps} />
                );
            })}
        </div>
    );
};

export default SuperBoard;
