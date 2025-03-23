import * as React from "react";
import SuperBoard from "~components/SuperBoard/SuperBoard";
import { SocketService } from "~services/SocketService";
import { Player } from "~types";
import useOnlineSuperGame from "./useOnlineSuperGame";

export type OnlineSuperGameProps = {
    socketService: SocketService;
    localPlayer: (Player | null);
    isRemoteUserConnected: boolean;
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
            <button className="ui-button" onClick={handleRestart}>
                {winner ? "Play Again" : "Restart"}
            </button>
        </div>
    );
};

export default OnlineSuperGame;
