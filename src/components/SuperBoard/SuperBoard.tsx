import * as React from "react";
import Board from "~components/Board/Board";
import { BoardState } from "~types";
import "./SuperBoard.css";

export type SuperBoardProps = {
    boards: BoardState[];
    handleClick: (arg1: number, arg2: number) => void;
};

const SuperBoard = (props: SuperBoardProps) => {
    const { boards, handleClick } = props;

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
