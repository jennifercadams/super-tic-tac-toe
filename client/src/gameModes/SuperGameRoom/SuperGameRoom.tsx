import * as React from "react";
import RoomPanel, { RoomPanelProps } from "~components/RoomPanel/RoomPanel";
import OnlineSuperGame, { OnlineSuperGameProps } from "~gameModes/OnlineSuperGame/OnlineSuperGame";
import useSuperGameRoom from "./useSuperGameRoom";
import "./SuperGameRoom.css";

const SuperGameRoom = () => {
    const {
        socketService,
        roomCode,
        localUser,
        remoteUser,
        prevRemoteUser,
        lastMove,
        setLastMove,
        errorMessage,
        setErrorMessage,
        handleCreateRoom,
        handleJoinRoom,
    } = useSuperGameRoom();

    const roomPanelProps: RoomPanelProps = { 
        roomCode,
        localUser,
        remoteUser,
        prevRemoteUser,
        errorMessage,
        setErrorMessage,
        handleCreateRoom,
        handleJoinRoom,
    };

    const onlineSuperGameProps: OnlineSuperGameProps = { 
        socketService,
        localPlayer: localUser?.player || null,
        isRemoteUserConnected: remoteUser !== null,
        lastMove,
        setLastMove,
    };

    return (
        <div className="super-game-room">
            <h1>Super Tic Tac Toe</h1>
            <div className="game-container">
                <RoomPanel {...roomPanelProps} />
                <OnlineSuperGame {...onlineSuperGameProps} />
            </div>
        </div>
    );
};

export default SuperGameRoom;
