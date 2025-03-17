import * as React from "react";
import { useState } from "react";
import Board from "~components/Board/Board";
import { checkForWinner } from "~helpers/gameHelper";
import { Player, Winner } from "~types";

const SingleGame = () => {
    const [ player, setPlayer ] = useState<string>(Player.X);
    const [ squares, setSquares ] = useState<string[]>(Array(9).fill(""));
    const [ status, setStatus ] = useState<string>("Player Turn: X");
    const [ winner, setWinner ] = useState<string | null>(null);

    const handleClick = (i: number) => {
        if (squares[i])
            return;

        const nextSquares = squares.slice();
        nextSquares[i] = player;
        setSquares(nextSquares);

        const nextPlayer = player == Player.X ? Player.O : Player.X;
        setPlayer(nextPlayer);

        const w = checkForWinner(nextSquares);

        if (!w) {
            setStatus(`Player Turn: ${nextPlayer}`);
        }
        else if (w === Winner.Draw) {
            setStatus("Draw");
        }
        else {
            setStatus(`Winner: ${w}`);
        }

        setWinner(w);
    };

    const handleRestart = () => {
        setPlayer(Player.X);
        setSquares(Array(9).fill(""));
        setStatus("Player Turn: X");
        setWinner(null);
    };

    const boardProps = { boardIndex: 0, playable: winner === null, squares, winner: null, handleClick };

    return (
        <div className="single-game">
            <Board {...boardProps} />
            <p className="status">{status}</p>
            <button onClick={handleRestart}>{winner ? "Play Again" : "Restart"}</button>
        </div>
    );
};

export default SingleGame;
