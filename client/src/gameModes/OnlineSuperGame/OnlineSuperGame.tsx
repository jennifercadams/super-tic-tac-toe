import * as React from "react";
import SuperBoard, { SuperBoardProps } from "~components/SuperBoard/SuperBoard";
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
        handleClick,
    } = useOnlineSuperGame(props);

    const superBoardProps: SuperBoardProps = { boards, handleClick };

    return (
        <div className="online-super-game">
            <SuperBoard {...superBoardProps} />
            <p className="status">{status}</p>
        </div>
    );
};

export default OnlineSuperGame;
