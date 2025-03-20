import * as React from "react";
import { Socket } from "socket.io-client";
import SuperBoard from "~components/SuperBoard/SuperBoard";
import { Player } from "~types";
import useOnlineSuperGame from "./useOnlineSuperGame";

export type OnlineSuperGameProps = {
    socket: Socket;
    player: (Player | null);
};

const OnlineSuperGame = (props: OnlineSuperGameProps) => {
    const {
        boards,
        status,
        winner,
        handleClick,
        handleRestart,
    } = useOnlineSuperGame(props);

    const superBoardProps = { boards, handleClick };

    return (
        <div className="online-super-game">
            <SuperBoard {...superBoardProps} />
            <p className="status">{status}</p>
            <button className="restart-button" onClick={handleRestart}>
                {winner ? "Play Again" : "Restart"}
            </button>
        </div>
    );
};

export default OnlineSuperGame;
