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
        localReconnected,
        setLocalReconnected,
        remoteUser,
        prevRemoteUser,
        lastMove,
        setLastMove,
        errorMessage,
        setErrorMessage,
        status,
        setStatus,
        handleCreateRoom,
        handleJoinRoom,
        handleLeaveRoom,
    } = useSuperGameRoom();

    const roomPanelProps: RoomPanelProps = { 
        roomCode,
        localUser,
        remoteUser,
        prevRemoteUser,
        errorMessage,
        setErrorMessage,
        status,
        handleCreateRoom,
        handleJoinRoom,
        handleLeaveRoom,
    };

    const onlineSuperGameProps: OnlineSuperGameProps = { 
        socketService,
        roomCode,
        localPlayer: localUser?.player || null,
        localReconnected,
        setLocalReconnected,
        isRemoteUserConnected: remoteUser !== null,
        lastMove,
        setLastMove,
        setStatus,
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
