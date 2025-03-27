import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import SuperBoard, { SuperBoardProps } from "~components/SuperBoard/SuperBoard";
import { SocketService } from "~services/SocketService";
import { Move, Player } from "~types";
import useOnlineSuperGame from "./useOnlineSuperGame";
import "./OnlineSuperGame.css";

export type OnlineSuperGameProps = {
    socketService: SocketService;
    roomCode: (string | null);
    localPlayer: (Player | null);
    localReconnected: boolean;
    setLocalReconnected: Dispatch<SetStateAction<boolean>>
    isRemoteUserConnected: boolean;
    lastMove: (Move | null);
    setLastMove: Dispatch<SetStateAction<Move | null>>;
    setStatus: Dispatch<SetStateAction<string>>
};

const OnlineSuperGame = (props: OnlineSuperGameProps) => {
    const { lastMove } = props;
    const { boards, handleClick } = useOnlineSuperGame(props);

    const superBoardProps: SuperBoardProps = { boards, lastMove, handleClick };

    return (
        <div className={`online-super-game${props.roomCode ? "" : " portrait-hide"}`}>
            <SuperBoard {...superBoardProps} />
        </div>
    );
};

export default OnlineSuperGame;
