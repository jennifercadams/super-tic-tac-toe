import * as React from "react";
import { useState } from "react";
import Board from "~components/Board/Board";
import { checkForWinner } from "~helpers/gameHelper";
import { BoardState, Player } from "~types";
import "./SuperBoard.css";

const SuperBoard = () => {
    const [ player, setPlayer ] = useState<string>(Player.X);
    const [ boards, setBoards ] = useState<BoardState[]>(Array(9).fill({ squares: Array(9).fill(""), winner: null }));
    const [ winner, setWinner ] = useState<string | null>(null);

    const handleClick = (squareIndex: number, boardIndex: number) => {
        if (boards[boardIndex].squares[squareIndex])
            return;
        
        const nextBoards = boards.map(board => { 
            return { ...board, squares: board.squares.slice() };
        });
        const nextSquares = boards[boardIndex].squares.slice();
        nextSquares[squareIndex] = player;
        nextBoards[boardIndex].squares = nextSquares;
        nextBoards[boardIndex].winner = checkForWinner(nextSquares);

        setBoards(nextBoards);

        const nextPlayer = player == Player.X ? Player.O : Player.X;
        setPlayer(nextPlayer);
    };

    return (
        <div className="super-board">
            {boards.map((board, i) => {
                const key = `board-${i}`;
                const boardProps = { boardIndex: i, squares: board.squares, winner: board.winner, handleClick };
                return (
                    <Board key={key} {...boardProps} />
                );
            })}
        </div>
    );
};

export default SuperBoard;
