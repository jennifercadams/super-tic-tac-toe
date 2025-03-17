import * as React from "react";
import { useState } from "react";
import Board from "~components/Board/Board";
import { checkForWinner } from "~helpers/gameHelper";
import { Player } from "~types";

const SingleGame = () => {
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

    const boardProps = { boardIndex: 0, playable: true, squares, winner, handleClick };

    return (
        <Board {...boardProps} />
    );
};

export default SingleGame;
